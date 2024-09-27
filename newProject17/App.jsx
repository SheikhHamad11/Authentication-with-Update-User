import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import AuthContextProvider from './src/context/AuthContext';

export default function App() {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 300);
  }, []);

  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
