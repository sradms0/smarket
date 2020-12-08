import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';
import withContext, { Context, Provider } from './context';


// local components
import Checkout from './components/Checkout';
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterWithContext = withContext(Register);
const LoginWithContext = withContext(Login);
const CheckoutWithContext = withContext(Checkout);

function LoginScreen({navigation}){
  return(
    <View style={styles.container}>
      <Provider>
        <LoginWithContext navigation={navigation}/>
        <StatusBar style="auto" />
      </Provider>
      <Text>{'\n'}</Text>
      <Button 
        title="Register"
        onPress={() => navigation.navigate('Register')}
        />
        <Text>{'\n'}</Text>
      </View>
  )
}

function RegisterScreen({navigation}){
  return(
    <View style={styles.container}>
      <Provider>
        <RegisterWithContext />
        <StatusBar style="auto" />
      </Provider>
  <Text>{'\n'}</Text>
    <Button title="Login"
            onPress={() => navigation.navigate('Login')} />
    </View>
  )
}


function CheckOutScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Check Out Screen</Text>
      <Provider>
        <CheckoutWithContext />
        <StatusBar style="auto" />
      </Provider>
  <Text>{'\n'}</Text>
  <Button title="Store Picker"
            onPress={() => navigation.navigate('Store Picker')} />
    </View>
  )
}

function CartScreen({navigation}){
  let theData = [];
  const [data, setData] = useState(theData);  
  const [toRemove, setToRemove] = useState("null");
  const [itemName, setItemName] = useState("null");
  const [itemPrice, setitemPrice] = useState("null");
  const [total, setTotal] = useState(0)

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

  let _renderItem = data => {
     return (
     <Text style={styles.row}>Item: {data.item.name} Quantity: {data.item.quant} Price: ${data.item.cost}</Text>
     );
  };

  let _keyExtractor = (item) => {return item.name;};
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
    <FlatList data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem} />
    <Text>Total: ${total}</Text>
    <Text>{"\n"}</Text>
    </View>
    <Button title="CheckOut"
            onPress={() => navigation.navigate('CheckOut')} />
    </View>
  )
}

function StorePickerScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Store Picker Screen</Text>
  <Text>{'\n'}</Text>
    </View>
  )
}

function WalletScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Wallet Screen</Text>
  <Text>{'\n'}</Text>
    <Button title="Coupon"
            onPress={() => navigation.navigate('Coupon')} />
    </View>
  )
}

function CouponScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Coupon Screen</Text>
  <Text>{'\n'}</Text>
    <Button title="Wallet"
            onPress={() => navigation.navigate('Wallet')} />
    </View>
  )
}

const LoginStack = createStackNavigator();

function LoginStackScreen(){
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen}/>
      <LoginStack.Screen name="Register" component={RegisterScreen}/>
    </LoginStack.Navigator>
  );
}

const CartStack = createStackNavigator();

function CartStackScreen(){
  return(
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen}/>
      <CartStack.Screen name="CheckOut" component={CheckOutScreen}/>
    </CartStack.Navigator>
    

  )
}

const WalletStack = createStackNavigator();
function WalletStackScreen(){
  return(
    <WalletStack.Navigator>
      <WalletStack.Screen name="Wallet" component={WalletScreen}/>
      <WalletStack.Screen name="Coupon" component={CouponScreen}/>
    </WalletStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginStackScreen} />
        <Tab.Screen name="Store Picker" component={StorePickerScreen}/>
        <Tab.Screen name="Cart" component={CartStackScreen} />
        <Tab.Screen name="Wallet" component={WalletStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
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
});
