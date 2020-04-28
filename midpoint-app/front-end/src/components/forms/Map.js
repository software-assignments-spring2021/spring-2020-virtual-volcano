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
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });
var myapikey = process.env.REACT_APP_APIKEY
let url = "https://maps.googleapis.com/maps/api/js?key=" + myapikey + "&libraries=places"

class Map extends React.Component {
  _isMounted = false;
//   static contextTypes = {
//     [MAP]: React.PropTypes.object
// }
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      mapPosition: {
        lat: 36.778259,
        lng: -119.417931,
    // data: {
    //     lat: 35.9039889,
    //     lng: -70.9261412,
    // }
        },
        mapRef: '' 
    };
    // this.mapMounted = this.mapMounted.bind(this);
  }

//     mapMounted(element) {
//     const mapObject = element.context[MAP];
//     this.fetchPlaces(mapObject);
//   }

// async asyncGetData() {
//     try {
//       // fetch data from a url endpoint
//       const data = await axios.get("http://localhost:3000/area");
//       console.log("These are the async get data coordinates");
//     console.log(data);
//         this.setState({ mapPosition: data.data })
//       return data;
//     } catch(error) {
//       console.log("error", error);
//       // appropriately handle the error
//     }
//   }

  componentDidMount () {
    //   this.asyncGetData()
    axios.get("http://localhost:3000/area")
    .then((response) => {
        console.log("These are the coordinates from axios");
        console.log(response);
        this.setState({ mapPosition: response.data })
        console.log("This is the map positions after axios");
        console.log(this.state.mapPosition);
        console.log(typeof (parseFloat(this.state.mapPosition.lat)));
        //create instance of mapnode
        this.mapInstance = this.mapNode.context[MAP]
        console.log("This is the map instance");
        console.log(this.mapInstance);
        // this.mapNode.context[MAP].setCenter(this.state.mapPosition);
        this.mapInstance.setCenter(this.state.mapPosition);
        console.log("tried to set map instance in axios");
        // console.log(this.mapNode.context[MAP].getCenter().toString());
        let middle = this.mapInstance.getCenter();
        console.log(middle.toString());
        this.fetchPlaces(this.mapInstance);
    })
    .catch((error) => {
        console.log(error);
    });

    console.log("MAP.JSSSSS");
    // console.log(this.props.center);
    this._isMounted = true;
    if (this._isMounted) {
        console.log("here did mount")
        // this.mapInstance = this.mapNode.context[MAP]
        // console.log("This is the map instance");
        // console.log(this.mapInstance);
        // console.log("This is the map instance after set center");
        // this.mapInstance.setCenter(this.state.mapPosition)
        // let middle = this.mapInstance.getCenter();
        // console.log(middle.toString());
        // const mapObject = this.context[MAP];
        // this.setState({ mapRef: mapObject })
        // this.fetchPlaces(this.mapInstance);
    // this.mapMounted = this.mapMounted.bind(this);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
        this.state.mapPosition.lat !== nextState.mapPosition.lat
    ) {
        return true
    // } else if (this.props.center.lat === nextProps.center.lat) {
    //     return false
    } else {
        console.log("UPDATE!!!")
        return true
    }
}

  componentDidUpdate(nextProps, nextState) {
    // console.log("here update next props!")
    // console.log(nextProps)
    // console.log("current state")
    console.log(this.state)
//     console.log("next state")
//     console.log(this.nextState)
//     this.setState({mapPosition: {
//         lat: nextProps.center.lat,
//         lng: nextProps.center.lng
//     }})
}

  componentWillUnmount () {
    this._isMounted = false;
    console.log("here unmounted")

  }

  fetchPlaces(map) {
    // map.setCenter(this.state.mapPosition)
    const request = {
      location: map.getCenter(),
    // location: this.state.mapPosition,
      radius: "402", //.25 miles
      type: ["restaurant"]
    };
    console.log("this is the fetch places center")
    console.log(map.getCenter().toString());
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
      //axios post
      console.log(JSON.stringify(marker.position));
      let markerInfo = {
            coords: marker.position,
            name: place.name
      };
      axios.post('http://localhost:3000/area', markerInfo)
      .then(function (response) {
          console.log("Success posting the all coordinates");
          console.log(response);
      }).catch(function (error) {
          console.log("Error posting");
          console.log(error);
      });
    });
}

  render() {
    // let map = 
    console.log("This should be the map position of the map");
    console.log(this.state.mapPosition);
    return ( <GoogleMap
        // ref={this.mapMounted}
        center={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
      ref={(el) => { this.mapNode = el }}
      google={this.props.google}
        defaultZoom={this.props.zoom}
        // defaultCenter={{
        //   lat: this.state.mapPosition.lat,
        //   lng: this.state.mapPosition.lng
        // }}
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
//                 // ref={(el) => { this.mapNode = el }}
//                 // ref={url}
//                 google={this.props.google}
//                 defaultZoom={this.props.zoom}
//                 defaultCenter={{lat: this.props.center.lat, lng: this.props.center.lng}}
                
//               >
//             </GoogleMap>
//             </React.Fragment>
//             )
//         )
//     )
//     let map;
//         // if (this.props.center.lat !== undefined) {
//             map = <div><AsyncMap>
//                 ref={url}
//                 loadingElement={
//                     <div style={{ height: '100%' }} />
//                 }
//                 containerElement={
//                     <div style={{ height: this.props.height }} />
//                 }
//                 mapElement={
//                     <div style={{ height: '100%' }} />
//                 }
//                 </AsyncMap> 
//                 </div>
//         // <div>
//         //     <AsyncMap
//         //             ref={url}
//         //             loadingElement={
//         //                 <div style={{ height: '100%' }} />
//         //             }
//         //             containerElement={
//         //                 <div style={{ height: this.props.height }} />
//         //             }
//         //             mapElement={
//         //                 <div style={{ height: '100%' }} />
//         //             }
//         //         />
//         //     </div>
//         // } else {
//         //     map = <div style={{ height: this.props.height }} />
//         // }
//         return (map)
//     }
// }
// export default Map;