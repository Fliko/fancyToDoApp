const chai = require('chai');
chai.should();
const expect = chai.expect;
import  MapApi from '../src/container/MapApi.jsx';
import sinon from 'sinon';
describe('MapApi', () => {
  beforeEach(()=>{
    let google={maps: mockGoogle()};
    global.google = google;
    global.map = 'map';
    global.search = 'search';
    global.mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    global.api = new MapApi(mapObj, map, search);
  });
  it('should setup map with constructor',() => {
    expect(google.maps.Map.calledWith(map, mapObj)).equal(true);
    expect(api.savedMarkers).eql([]);
    expect(api.map.controls['TOP_RIGHT']).eql(["search"]);
    expect(google.maps.DirectionsService.calledOnce).equal(true);
    expect(google.maps.DirectionsRenderer.calledOnce).equal(true);
    expect(google.maps.InfoWindow.calledOnce).equal(true)
    expect(google.maps.Marker.calledWith({map: api.map})).equal(true)
  });
  it('should save a marker',()=>{
    let marker1 = api.marker;
    let infowindow1 = 'infowindow1';
    sinon.stub(api,"setBounds").returns(0);
    expect(api.saveMarker(marker1,infowindow1)).eql([infowindow1,marker1]);
  });
  it('should remove a marker',()=>{
    let marker = [new google.maps.InfoWindow,new  google.maps.Marker]
    api.savedMarkers.push(marker)
    api.removeMarker(marker);
    expect(api.savedMarkers).eql([])
  });
  it('should update the map with new search and delete old',()=>{
    sinon.stub(api,"setBounds").returns(0);
    sinon.stub(api.autocomplete,"getPlace").returns({geometry:1});
    api.changePlace();
    expect(google.maps.InfoWindow.calledTwice).equal(true)
    expect(google.maps.Marker.calledWith({map: api.map})).equal(true)
  });
  it('should make all saved markers visible',()=>{
    sinon.stub(api,"setBounds").returns(0);
    sinon.stub(api.autocomplete,"getPlace").returns({geometry:1});
    api.saveMarker(api.marker,'infowindow');
    api.saveMarker(api.marker,'infowindow');
    api.saveMarker(api.marker,'infowindow');
    api.changePlace();
    for(var i = 0; i < api.savedMarkers.length;i++){
      expect(api.savedMarkers[i][1].setVisible.called).equal(true);
    }
  });
  it('should set the values of the new marker', ()=>{
    sinon.stub(api,"setBounds").returns(0);
    sinon.stub(api.autocomplete,"getPlace").returns({name:'name',
                                                geometry:{location:1}});
    api.changePlace();
    expect(api.marker.setPosition.calledWith(1)).equal(true);
    expect(api.marker.setTitle.calledWith('name')).equal(true);
    expect(api.setBounds.called).equal(true);
    expect(api.marker.setVisible.calledWith(true)).equal(true);
  });
  it('should set the values of the new infowindow', ()=>{
    sinon.stub(api,"setBounds").returns(0);
    sinon.stub(api.autocomplete,"getPlace").returns({name:'name',
                                                geometry:{location:1}});
    api.changePlace();
    expect(api.infowindow.setContent.called).equal(true);
    expect(api.infowindow.open.calledWith(api.map,api.marker)).equal(true);
  });
});

function mockGoogle() {
  return {Map:sinon.spy(function(){
    this.controls={TOP_RIGHT:[]};
    this.addListener = sinon.spy();
    this.fitBounds=()=>{};
    return;
  }),
  DirectionsService:sinon.spy(function(){
    this.route = sinon.spy()
  }),
  DirectionsRenderer:sinon.spy(function(){
    this.setMap = sinon.spy()
  }),
  InfoWindow:sinon.spy(function(){
    this.open = sinon.spy();
    this.close = sinon.spy();
    this.setContent = sinon.spy();
  }),
  Marker:sinon.spy(function(){
    this.addListener = sinon.spy();
    this.getPosition = sinon.spy();
    this.setVisible = sinon.spy();
    this.setPosition = sinon.spy();
    this.setTitle = sinon.spy();
  }),
  places:{Autocomplete:sinon.spy(function(){
    this.addListener=sinon.spy();
    this.getPlace=()=>{};
  })},
  ControlPosition:{TOP_RIGHT:'TOP_RIGHT'},
  LatLngBounds:sinon.spy(function(){this.extend = sinon.spy()}),
  event:sinon.spy(function(){
    this.addListener = sinon.spy();
  }),
  }
}
