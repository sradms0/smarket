import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, FlatList, TextInput } from 'react-native';
import withContext, { Context } from './context';


// local components
import Checkout from './components/Checkout';
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import Cart from './components/Cart';
import Wallet from './components/Wallet';
import StoreLocator from './components/StoreLocator';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterWithContext = withContext(Register);
const LoginWithContext = withContext(Login);
const CartWithContext = withContext(Cart);
const CheckoutWithContext = withContext(Checkout);
const WalletWithContext = withContext(Wallet);
const StoreLocatorWithContext = withContext(StoreLocator);

function LoginScreen({navigation}){
  return(
    <View style={styles.container}>
      <LoginWithContext navigation={navigation}/>
      <StatusBar style="auto" />
      <Text>{'\n'}</Text>
      <Button 
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
        />
        <Text>{'\n'}</Text>
      </View>
  )
}

function RegisterScreen({navigation}){
  return(
    <View style={styles.container}>
      <RegisterWithContext />
      <StatusBar style="auto" />
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
        <CheckoutWithContext />
        <StatusBar style="auto" />
  <Text>{'\n'}</Text>
  <Button title="Store Picker"
            onPress={() => navigation.navigate('Store Picker')} />
    </View>
  )
}



function CartScreen({navigation}){
  return(
    <View style={styles.container}>
      <CartWithContext navigation={navigation}/>
      <StatusBar style="auto" />
      <Text>{'\n'}</Text>
      <Button title="CheckOut"
              onPress={() => navigation.navigate('CheckOut')} />
      <Text>{'\n'}</Text>
    </View>
  )
}

function StorePickerScreen({navigation}){
  return(
    <View style={styles.container}>
      <StoreLocatorWithContext navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  )
}

function WalletScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>{'\n'}</Text>
      <WalletWithContext navigation={navigation} />
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
      <LoginStack.Screen name="Login" component={LoginScreen} style={styles.button}/>
      <LoginStack.Screen name="Register" component={RegisterScreen} style={styles.button}/>
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

const StoreLocatorStack = createStackNavigator();
function StoreLocatorStackScreen(){
  return (
    <StoreLocatorStack.Navigator>
      <StoreLocatorStack.Screen name="Store Picker" component={StoreLocatorScreen}/>
    </StoreLocatorStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

export default function App({ context }) {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon:({focused, color, size}) => {
              let iconName;

              if(route.name === 'Login'){
                iconName = focused ? 'ios-body' : 'ios-body';
              } else if (route.name === 'Store Picker'){
                iconName = focused ? 'ios-map' : 'ios-map';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'md-cart' : 'md-cart';
              } else if (route.name === 'Wallet') {
                iconName = focused ? 'ios-wallet' : 'ios-wallet'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'white',
            style: {backgroundColor: '#b22222',
          },
          }}>
        <Tab.Screen name="Login" component={LoginStackScreen} style={styles.container} />
          {context.authenticatedUser ? (
            <React.Fragment>
              <Tab.Screen name="Store Picker" component={StorePickerScreen}/>
              <Tab.Screen name="Cart" component={CartStackScreen} />
              <Tab.Screen name="Wallet" component={WalletStackScreen}/>
            </React.Fragment>
          ): null}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
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
navrbar: {
  backgroundColor:'#b22222',
},

button: {
  backgroundColor: '#b22222',
  color: '#f8f8ff',
  borderWidth: 3,
  borderColor: '#f8f8ff',
}
});
