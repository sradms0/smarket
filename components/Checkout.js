import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';

export default function Checkout({ context }){

    return(
        <View style={styles.container}>
        <Text>Checkout Screen</Text>
        <Text>Total: ${context.cartTotal}</Text>
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
    }
});
