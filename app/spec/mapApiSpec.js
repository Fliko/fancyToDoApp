const chai = require('chai');
chai.should();
const expect = chai.expect;
import  MapApi from '../src/container/MapApi.jsx';

describe('MapApi', () => {
  beforeEach(()=>{
    const google = '';
    let mapObj = {center: {lat:29.4241, lng: -98.4936}, zoom: 11};
    let map = document.getElementById('map');
    let search = document.getElementById('search');
    let api = new MapApi(mapObj, map, search);
  })
  it('should create a map and give acces to the api',() => {
    expect(api.map).toEqual(map);
  });
});
