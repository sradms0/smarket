import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import App from './App';
import withContext, { Context, Provider } from './context';

const AppWithContext = withContext(App);

registerRootComponent(() => <Provider><AppWithContext/></Provider>);
