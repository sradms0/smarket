import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const API_KEY = '';

export default function Map() {
  const [myRegion, setMyRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015
  });
  const [myStores, setMyStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('')

  useEffect(() => {
    (async () => {
      if (myRegion.latitude === 0 && myRegion.longitude === 0) {
        try {
          setLoading(true);
          const permissions = await Location.requestPermissionsAsync();

          if (permissions.status === "granted") {
            const currentLocation = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
            let { coords: {latitude, longitude} } = currentLocation;
            setMyRegion({...myRegion, ...{latitude, longitude}});
          }
        } catch (err) {
          console.log(err);
          setErrors(err.message)
        } finally {
          setLoading(false);
        } 
      } else {
        const stores = await getSurroundingStores(myRegion);
        setMyStores(stores);
      } 
    })();

  }, [myRegion]);

  const onChangeRegion = (region) => {
    setMyRegion( region );
  }

  const getStoreNames = () => {
    return myStores.map((store, i) => 
      (<Text key={i}>{`${i+1}: ${store.name}`}</Text>)
    );
  }

  const getSurroundingStores = async ({ latitude, longitude }) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=Grocery store&key=${API_KEY}`
      );
      const { data: {results} } = res;
      return results.map(result => {
        const { 
          geometry: { location: {lat,lng} },
          name, 
          opening_hours: {open_now: openNow}={open_now: null},
          photos,
          rating, 
          user_ratings_total: totalRatings,
          types,
          vicinity
        } = result;
        return {key: vicinity, lat, lng, name, openNow, photos, rating, totalRatings, types, vicinity};
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  return (
    <View style={styles.container}>
      {loading ? (<Text>{'Loading...'}</Text>) : (
        <React.Fragment>
          <Text>{myStores.length}</Text>
          <Text>{`lat: ${myRegion.latitude}, lng: ${myRegion.longitude}`}</Text>
          <MapView style={styles.mapStyle}
             region={myRegion}
             onRegionChange={onChangeRegion}
          />
          <Text>{`Stores by you (${myStores.length}):`}</Text>
          {getStoreNames()}
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    width: 400,
    height: 250
  },
});
