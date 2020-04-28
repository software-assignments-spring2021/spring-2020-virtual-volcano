/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
  InfoWindow
} from "react-google-maps";
import { MAP } from "react-google-maps/lib/constants";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
        }
    };
    this.mapMounted = this.mapMounted.bind(this);
  }

  fetchPlaces(map) {
    const request = {
      location: map.getCenter(),
      radius: "402", //.25 miles
      type: ["restaurant"]
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {

        const places = results.map((item, i) => {
          return {
            name: item.name,
            position: item.geometry.location,
            id: i
          };
        });
        this.setState({ places });
        {this.state.places.map(place => {
            this.createMarker(place, map);
        })}
      }
    });
  }

  mapMounted(element) {
    const mapObject = element.context[MAP];
    this.fetchPlaces(mapObject);
  }

  createMarker(place, map) {
    var infowindow = new google.maps.InfoWindow(); 
        console.log(place);
        var marker = new google.maps.Marker({
        key: place.id,
        map: map,
        position: place.position
        });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
}

  render() {
    return (
        <GoogleMap
          ref={this.mapMounted}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.props.center.lat,
            lng: this.props.center.lng
          }}
        >
         </GoogleMap>
      );
    }
  }
  
  export default withScriptjs(withGoogleMap(Map));


  
//     const AsyncMap = withScriptjs(
//         withGoogleMap(
//             props => ( 
//                 <React.Fragment>
//                 <GoogleMap
//                 ref={this.mapMounted}
//                 defaultZoom={this.props.zoom}
//                 defaultCenter={{
//                   lat: this.props.center.lat,
//                   lng: this.props.center.lng
//                 }}
//               >
//             </GoogleMap>
//             </React.Fragment>
//             )
//         )
//     )
//     let map;
//         if (this.props.center.lat !== undefined) {
//             map =
//             <div>
//                 <div>
//                 <div className="form-group">
//                         <label htmlFor="">Lat</label>
//                         <input type="text" name="lat" className="form-control"
//                             onChange={this.onChange} readOnly="readOnly" value={this.state.mapPosition.lat} style={{ width: '100%' }} />
//                 </div>
//                 <div className="form-group">
//                         <label htmlFor="">Lng</label>
//                         <input type="text" name="lng" className="form-control"
//                             onChange={this.onChange} readOnly="readOnly" value={this.state.mapPosition.lng} style={{ width: '100%' }} />
//                 </div>
//                     <br></br>
//             </div>
//             <AsyncMap
//                     googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAw9LvtDJ_MXyFP2hS-tG_GqlfECOnY-QI&libraries=places"}
//                     loadingElement={
//                         <div style={{ height: '100%' }} />
//                     }
//                     containerElement={
//                         <div style={{ height: this.props.height }} />
//                     }
//                     mapElement={
//                         <div style={{ height: '100%' }} />
//                     }
//                 />
//             </div>
//         } else {
//             map = <div style={{ height: this.props.height }} />
//         }
//         return (map)
//     }
// }
// export default Map;