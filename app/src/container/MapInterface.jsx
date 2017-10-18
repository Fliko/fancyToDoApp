import { connect } from 'react-redux';
import { saveMap } from '../actions/actions';
import Map from '../components/Map.jsx';

let MapApi = () => {
  
}

mapStateToProps = state => ({
    mapState: state.mapState || [],
    Maps: MapApi
});

mapDispatchToProps = dispatch => ({
  saveMap: (name, data) => {
    dispatch(saveMap(name, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
