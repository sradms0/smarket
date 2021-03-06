import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from 'react-native-maps';

export default function StoreLocator({ context, navigation }) {
  const [myRegion, setMyRegion] = useState({
      latitude: 42.440958031232164,
      longitude: -76.50968755977043,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015
  });
  const [alreadyFoundStores, setAlreadyFoundStores] = useState(false);
  const [myStores, setMyStores] = useState([]);
  const [myStoresLoading, setMyStoresLoading] = useState(false);
  const [myRegionLoading, setMyRegionLoading] = useState(false);
  const [selectedStoreKey, setSelectedStoreKey] = useState(null);

  useEffect(() => {
    (async () => {
      if (myRegion.latitude === 0 && myRegion.longitude === 0) {
        try {
        } catch (err) {
          console.log(err);
        } finally {
        } 
      } else if (!alreadyFoundStores) {
        context.actions.getSurroundingStores();
        setAlreadyFoundStores(true);
      } 
    })();

  }, [myRegion, alreadyFoundStores]);

  const onChangeRegion = (region) => {
    setMyRegion( region );
  }

  const getStoreNames = () => {
    return myStores.map((store, i) => 
      (<Text key={i}>{`${i+1}: ${store.name}`}</Text>)
    );
  }

  const displayRegion = () => {
    return (
      <MapView style={styles.mapStyle}
        region={myRegion}
        onRegionChange={onChangeRegion}
      >
          {context.storeLocations.map((s, i) => (
            <Marker
              key={i}
              coordinate={s.latlng}
              title={s.name}
              description={'store!'}
              pinColor={s.pinColor}
            />
          ))}
      </MapView>
    );
  }

  const displayStores = () => (
    <ScrollView contentContainerStyle={styles.storeList}>
      <Text>stores found:{context.storeLocations.length}</Text>
        {context.storeLocations.map((s, i) => ( 
          <Text 
            onPress={() => {
              if (context.currentStore !== s.name)
                context.actions.clearCartItems();
              context.actions.updateCurrentStore(s.name, s.dataName);
              navigation.navigate("Cart");
            }}
            style={styles.row} 
            key={i}>{s.name}
          </Text>
        ))}
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      {displayRegion()}
      {displayStores()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefd5',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  storeList: {
    backgroundColor: '#7fffd4',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#90ee90',
    color: '#f8f8ff',
    borderLeftWidth: 5,
    
  },
  mapStyle: {
    width: 400,
    height: 250
  },
  item: {
    backgroundColor:'#a6d1ae',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    fontSize: 24, 
    padding: 30, 
    borderWidth: 2,
    borderColor: "#f8f8ff",
   backgroundColor: '#BB3333',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#f8f8ff',
  },
  title: {
    fontSize: 32,
  },
});
