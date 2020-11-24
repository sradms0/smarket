import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import withContext, { Provider } from './context';

// local components
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterWithContext = withContext(Register);
const LoginWithContext = withContext(Login);

function LoginScreen({navigation}){
  return(
    <View style={styles.container}>
      <Provider>
        <LoginWithContext />
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



const LoginStack = createStackNavigator();

function LoginStackScreen(){
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === 'Login'){
            iconName = focused ? 'ios-body' : 'ios-body';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
      }}
      >
      <Tab.Screen name="Login" component={LoginStackScreen} />
      </Tab.Navigator>
      </NavigationContainer>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
