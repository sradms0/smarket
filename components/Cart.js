import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { 
  StyleSheet,
  Text, 
  ScrollView, 
  View, 
  Button, 
  Alert, 
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Modal
} from 'react-native';

import GestureRecognizer, 
      {swipeDirections} 
from 'react-native-swipe-gestures';

export default function Cart({ context }) {
  const [toRemove, setToRemove] = useState("null");
  const [itemName, setItemName] = useState("null");
  const [itemPrice, setitemPrice] = useState("null");
  const [total, setTotal] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);

  const add = item => {
    context.actions.addCartItem(item);
  };

  const remove = item => {
    context.actions.removeCartItem(item);
  };

  const displayStoreItems = () => (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              {context.currentStore.data.items.map((item, i) => ( 
                <Text style={styles.row} key={i} onPress={() => add(item)}>
                  {`Item: ${item.food} Price: \$${item.price}`}
                </Text>
              ))}
            </ScrollView>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.openCloseModal}>Back</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );

  const displayChosenItems = () => (
    <ScrollView>
        {context.cartItems.map((item,i) => ( 
          <GestureRecognizer 
            onSwipeRight={() => add(item)} 
            onSwipeLeft={() => remove(item)} 
            key={item.name+''+i}>
            <Text style={styles.row}>{`Item: ${item.food} Quantity: ${item.quantity} Price: \$${item.price}`}</Text>
          </GestureRecognizer>
        ))}
    </ScrollView>
  );

  return(
    <View style={styles.container}>
      {context.currentStore ? (
        <React.Fragment>
          <Text style={{fontSize: 32, color:'#b22222'}}>{context.currentStore.displayName} Cart</Text>
          <TouchableHighlight
            style={styles.openCloseModal}
            onPress={() => {
              setModalVisible(true);
            }}
          >
          <Text style={styles.textStyle}>Add Items</Text>
          </TouchableHighlight>
          {displayChosenItems()}
          {displayStoreItems()}
          <Text>Total: ${context.cartTotal}</Text>
          <Text>{"\n"}</Text>
      </React.Fragment>
      ) : (<Text>Please choose a store</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor:'#BB3333',
    fontSize: 24,
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
  openCloseModal: {
    borderRadius:10,
    backgroundColor:'#b22222',
    padding: 10,
    borderWidth: 3,
    borderColor: '#f8f8ff',
    color: '#f8f8ff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    maxHeight: '100%',
    overflow: 'scroll',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
