import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 18.520430299999997;
const LONGITUDE = 73.8567437;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapExample extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  componentDidMount(){
      navigator.geolocation.getCurrentPosition((position)=>{
          //alert("Latitude:" + position.coords.latitude + " " + "Longitude:" + position.coords.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

      this.watch = navigator.geolocation.watchPosition((position)=>{
        alert("Latitude:" + position.coords.latitude + " " + "Longitude:" + position.coords.longitude);

        this.setState({
          region: { 
             latitude: position.coords.latitude,  
             longitude: position.coords.longitude,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
         }
        })
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watch);
  }

  onMapPress(e) {
    console.log("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
    this.setState({
         region: { 
            latitude: e.nativeEvent.coordinate.latitude,  
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    })
  }

  render() {
    return (
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsUserLocation={ true }
        scrollEnabled={true}
        pitchEnabled={true}
        zoomEnabled={true}
        initialRegion={ this.state.region }
        onRegionChange={ region => this.setState({region}) }
        onRegionChangeComplete={ region => this.setState({region}) }
        onPress={this.onMapPress}
      >
        <MapView.Marker
          coordinate={ this.state.region }
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

AppRegistry.registerComponent('mapsapp', () => MapExample);