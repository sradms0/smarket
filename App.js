import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import withContext, { Context, Provider } from './context';

// local components
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import Map from './components/Map';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterWithContext = withContext(Register);
const LoginWithContext = withContext(Login);

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
  <Text>{'\n'}</Text>
  <Button title="Store Picker"
            onPress={() => navigation.navigate('Store Picker')} />
    </View>
  )
}



function CartScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Cart Screen</Text>
  <Text>{'\n'}</Text>
    <Button title="CheckOut"
            onPress={() => navigation.navigate('CheckOut')} />
    </View>
  )
}

function StorePickerScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Store Picker Screen</Text>
      <Map/>
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
});
