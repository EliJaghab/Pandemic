//This includes FlatList Beta


import React, { Component } from 'react';
import { Button, Text, View, StyleSheet,TextInput } from 'react-native';
import Swiper from 'react-native-swiper'; // 1.5.13
import PureChart from 'react-native-pure-chart';

export default class App extends Component {

  // Create States to Store Variables
  constructor(props) {

    super(props);

    this.state = {
      custLoc: '',
      custLocTemp: '',
      latitude: '',
      longitude: '',
      latitudeTemp: '',
      longitudeTemp: '',
      countries: [],
    };
    global.custLoc = "";
    global.lat = "";
    global.lon = "";
  }

  componentDidMount() {
    this.getCaseCount();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          });
        },

        (error) => this.setState({ error: error.message, latitude:40.0379, longitude:75.3433 }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );
  }

  getLocation(){
    this.setState({
      latitudeTemp:this.state.latitude,
      longitudeTemp:this.state.longitude,
    })
  }

  

 submitLocation() {

    global.custLoc = this.state.custLocTemp;
}

getCaseCount(){
  global.lat = parseInt(this.state.latitude);
  global.lon = parseInt(this.state.longitude);
  fetch(`https://coronadatascraper.com/timeseries-byLocation.json`)
  .then(response => response.json())
  .then(data => this.setState({ countries: Object.keys(data) }));
}

  render() {

        const { countries } = this.state;
        return (<Swiper style={styles.wrapper} showsButtons={true}>

        <View style = {styles.container}>
        <Text style={styles.title}> Pandemic </Text>
        <Text style={styles.otherText}> Location: </Text>
        <Text style={styles.otherText}> <Text style={styles.otherText}> First Country: {countries[0]} </Text></Text>
        <TextInput style={styles.input}
          placeholder="Custom Location"
          onChangeText={(value) => this.state.custLocTemp = value}
        />
      <Button
            title = 'Enter'
            onPress={() => this.submitLocation()}
        />

        <Text style={styles.otherText}>
          Location: {global.custLoc}
        </Text>
        </View>

        <View style = {styles.container}>

        <Text style={styles.title}>Graph</Text>
        
        {/*Documentation for Graph:  https://github.com/oksktank/react-native-pure-chart     */}
        <PureChart data={[ {x: '2018-01-01', y: 30}, {x: '2018-01-02', y: 200}, {x: '2018-01-03', y: 170}, {x: '2018-01-04', y: 250}, {x: '2018-01-05', y: 10} ]} type='line' />
        <Button
            title = 'Get Location'
            onPress={() => this.getLocation() }
        />
        <Text style= {styles.otherText}>Latitude: {this.state.latitudeTemp}</Text>
        <Text style= {styles.otherText}>Longitude: {this.state.longitudeTemp}</Text>
        <Text style={styles.otherText}> Location: {global.custLoc}</Text>
              {this.state.error ? <Text style={styles.error}>Error: {this.state.error} Default Coordinates: Villanova University</Text> : null}
        </View>
        </Swiper>
        );
      }
    }
    const styles = StyleSheet.create({
      wrapper: {
      },
      title: {
        color: 'white',
        fontSize: 50,
        textAlign: "center",
        position:"absolute",
        top:150,
      },
      otherText: {
        color: 'white',
        fontSize: 25,
      },
      container: {
        flex: 1,
        backgroundColor: '#001F5B',
        alignItems: 'center',
        justifyContent: 'center',
      },
      author: {
        position:"absolute",
        bottom: 5,
        right: 30,
        color: "white",
        fontSize: 15,
      },
      input: {
        borderColor: "black",
        backgroundColor: "white",
        fontSize: 20,
      },
      error:{
        fontSize: 15,
        color: "red"
      }
    });
