import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import withContext, { Provider } from './context';

// local components
import Register from './components/Account/Register';
import Login from './components/Account/Login';

const RegisterWithContext = withContext(Register);
const LoginWithContext = withContext(Login);

export default function App() {
  return (
      <View style={styles.container}>
      <Provider>
        {/*<RegisterWithContext />*/}
        <LoginWithContext />
        <StatusBar style="auto" />
      </Provider>
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
});
