import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import App from './App';
import { Context, Provider } from './context';

registerRootComponent(() => <Provider><App/></Provider>);
