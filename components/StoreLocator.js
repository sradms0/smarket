import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from 'react-native-maps';

export default function StoreLocator({ context }) {
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
          {context.stores.map((s, i) => (
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

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.key === selectedStoreKey ? "#6e3b6e" : "#a6d1ae";
    return (
      <Item
        item={item}
        onPress={() => setSelectedStoreKey(item.key)}
        style={{ backgroundColor: "#a6d1ae" }}
      />
    );
  };

  const displayStores = () => (
    myStoresLoading ? (<Text>Finding stores for you...</Text>): (
      <View style={styles.container}>
        <Text>stores found:{context.stores.length}</Text>
          {context.stores.map((s, i) => ( 
            <Text key={i}>{s.name}</Text>
          ))}
      </View>
    )
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 32,
  },
});
