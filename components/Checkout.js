import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';

export default function Checkout({ context }){
  return(
    <View style={styles.container}>
      <Text>Checkout</Text>
      {context.cartItems.map(d => {
        return (
          <Text style={styles.row} key={d.name}>{`Item: ${d.name} Quantity: ${d.quant} Price: \$${d.cost}`}</Text>
        );
      })}
      <Text>{`Total Items: ${context.cartItems.length}`}</Text>
      <Text>{`Subtotal: ${context.cartTotal}\n`}</Text>
      <Text>{`Total: ${context.actions.calculateCartTotalWithTax(.08875)}`}</Text>
    <Text>{"\n"}</Text>
    </View>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    fontSize: 24, 
    padding: 30, 
    borderWidth: 1,
    borderColor: "#DDDDDD",
   backgroundColor: '#BB3333',
   alignItems: 'center',
   justifyContent: 'center',
},
});
