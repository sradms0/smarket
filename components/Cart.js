import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';

export default function Cart() {
  let theData = [];
  const [data, setData] = useState(theData);  
  const [toRemove, setToRemove] = useState("null");
  const [itemName, setItemName] = useState("null");
  const [itemPrice, setitemPrice] = useState("null");
  const [total, setTotal] = useState(0)

  //testing
  useEffect(() => {
    let items = [];
    for (let i = 0; i < 100; i++) 
      items.push({ name: i+1, cost: i*10, quant: i+1})
    setData(items);
  }, []);

  const add = () => {
    var newDs = []
    if (itemName != 'null' && itemPrice != 'null' ){
      var found = data.filter((item) => item.name == itemName)
      if (found.length ==0){
        newDs = data.slice();
        newDs.push({ name:itemName, cost:itemPrice, quant:1})
        setData(newDs);
        Alert.alert("New item added")
      }
      else{
        newDs = data.map((item) => inc(item))
        setData(newDs)
        Alert.alert("Quantity updated")
      }
      setTotal(newDs.reduce(function(sum, item){return sum +Number(item.cost)}, 0))
    }
    else{
      Alert.alert("Item not added")
    }
  };

  const inc = (item) => {
    if (item.name == itemName){
      item.quant += 1; 
      item.cost = Number(item.cost)+Number(itemPrice);
    }
    return item;
  }

  const remove = () => {
    var found = data.filter((item) => item.name == toRemove)
    if (found==0){
      Alert.alert("Not removed")
    }
    else{
    var newDs = data.filter((item) => item.name != toRemove)
    setData(newDs);
    Alert.alert("Removed");
    setTotal(newDs.reduce(function(sum, item){return sum +Number(item.cost)}, 0))
    }
    
  };


  return(
    <View style={styles.container}>
      <Text>Cart Screen</Text>
      <View style={styles.container}>
     <View style={styles.container}>
       <TextInput style={{flex:1}}
          style={{height: 40}}
          placeholder='Enter a item'
          onChangeText={(myState) => setItemName(myState)}
         />
       <TextInput style={{flex:1}}
        style={{height: 40}}
        placeholder='Enter a price'
        onChangeText={(myState) => setitemPrice(myState)}
       />
       
      <TouchableOpacity
        onPress={add}
      >   
     <Text> Add Item</Text>

    </TouchableOpacity>
    <Text>{"\n"}</Text>
    <TextInput style={{flex:1}}
        style={{height: 40}}
        placeholder='Enter an indentifer'
        onChangeText={(myState) => setToRemove(myState)}
       />
      <TouchableOpacity
     onPress={remove}
     >   
     <Text> Remove Item</Text>
    </TouchableOpacity>
    </View>

    {/*flat-list alternative...*/}
    <ScrollView>
    {data.map(d => {
      return (
          <Text style={styles.row} key={d.name}>{`Item: ${d.name} Quantity: ${d.quant} Price: ${d.cost}`}</Text>
      );
    })}
    </ScrollView>
    <Text>Total: ${total}</Text>
    <Text>{"\n"}</Text>
    </View>
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
  row: {
    fontSize: 24, 
    padding: 30, 
    borderWidth: 1,
    borderColor: "#DDDDDD",
   backgroundColor: '#BB3333',
   alignItems: 'center',
   justifyContent: 'center',
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