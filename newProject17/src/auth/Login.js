const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {log} from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import {useAuthContext} from '../context/AuthContext';
import {BackHandler} from 'react-native';

function LoginPage({props}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn, setisLoggedIn} = useAuthContext();

  function handleSubmit() {
    // console.log(email, password);
    const userData = {
      email: email,
      password,
    };

    axios.post('http://192.168.60.27:5001/login-user', userData).then(res => {
      // console.log(res.data);
      if (res.data.status == 'ok') {
        Alert.alert('Success', 'Logged In Successfull');
        AsyncStorage.setItem('token', res.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        AsyncStorage.setItem('userType', res.data.userType);
        setisLoggedIn(true);
        // dispatch({type: 'LOGIN'});
        // if (res.data.userType == 'Admin') {
        //   navigation.navigate('AdminStack');
        // } else {
        //   navigation.navigate('Home');
        // }
      } else {
        Alert.alert('Error', 'User Not Found');
      }
    });
  }

  const handlebackPress = () => {
    // Alert.alert('Exit App', 'Are You Sure You Want To Exit?', [
    //   {text: 'cancel', onPress: () => null, style: 'cancel'},
    //   {
    //     text: 'exit',
    //     onPress: () => BackHandler.exitApp(),
    //   },
    // ]);
    // return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handlebackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handlebackPress);
      };
    }),
  );
  // async function getData() {
  //   const data = await AsyncStorage.getItem('isLoggedIn');

  //   console.log(data, 'at app.jsx');
  // }
  // useEffect(() => {
  //   getData();
  //   console.log('Hii');
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}
      style={{backgroundColor: '#4361ee'}}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../Images/mainLogo.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              label="Type Something..."
              placeholder="Mobile or Email"
              style={styles.textInput}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text
              style={{color: '#420475', fontWeight: '700'}}
              onPress={() => navigation.navigate('Forgot')}>
              Forgot Password
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>

          <View style={{padding: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
              ----Or Continue as----
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="user-circle-o"
                  color="white"
                  style={styles.smallIcon2}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>

              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="google"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert('Coming Soon')}>
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default LoginPage;
