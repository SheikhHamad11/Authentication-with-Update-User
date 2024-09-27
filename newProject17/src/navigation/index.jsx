import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../context/AuthContext';
import {AdminStack} from './AdminStack';
import {DrawerNav} from './MainAppStacks';
import {AuthStacks} from './AuthStacks';
import MainStack from './MainAppStacks';

export default function Routes() {
  const {isLoggedIn, setisLoggedIn} = useAuthContext();
  const [userType, setuserType] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    const userType1 = await AsyncStorage.getItem('userType');
    setisLoggedIn(data);
    setuserType(userType1);
  }
  useEffect(() => {
    getData();
  });

  return (
    <NavigationContainer>
      {isLoggedIn && userType == 'Admin' ? (
        <AdminStack />
      ) : isLoggedIn ? (
        <>
          {console.log(isLoggedIn)}
          <MainStack />
        </>
      ) : (
        <>
          {console.log(isLoggedIn)}
          <AuthStacks />
        </>
      )}
    </NavigationContainer>
  );
}
