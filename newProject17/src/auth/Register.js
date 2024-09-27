import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AddImage} from '../components/AddPost';
import {RadioButton} from 'react-native-paper';
function RegisterPage({props}) {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [userType, setUserType] = useState('');
  const [secretText, setSecretText] = useState('');
  const navigation = useNavigation();
  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      // cropping: false,
    })
      .then(image => {
        if (image.path) {
          setImage(image.path);
          console.log('imageUri', image);
        }
      })
      .catch(error => {
        console.error('Error selecting image:', error);
      });
  };

  function handelSubmit() {
    const formdata = new FormData();
    formdata.append('file', {
      uri: image,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formdata.append('name', name);
    formdata.append('password', password);
    formdata.append('email', email);
    formdata.append('mobile', mobile);
    formdata.append('userType', userType);
    if (nameVerify && emailVerify && nameVerify && passwordVerify) {
      if (userType == 'Admin' && secretText != 'Text1243') {
        return Alert.alert('Invalid Admin');
      }

      axios
        .post('http://192.168.60.27:5001/register', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 'ok') {
            Alert.alert('Registered Successfull!!');
            navigation.navigate('LoginPage');
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => console.log(e));
    } else {
      Alert.alert('Warning', 'Fill mandatory details');
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[0-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      style={{backgroundColor: '#4361ee'}}>
      <View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../Images/signUp.png')} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Register!!!</Text>
          <View style={styles.radioButton_div}>
            <Text style={styles.radioButton_title}> Login as</Text>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>User</Text>
              <RadioButton
                value="User"
                status={userType == 'User' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('User')}
              />
            </View>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Admin</Text>
              <RadioButton
                value="Admin"
                status={userType == 'Admin' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('Admin')}
              />
            </View>
          </View>
          {userType == 'Admin' ? (
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Secret Text"
                style={styles.textInput}
                onChange={e => setSecretText(e.nativeEvent.text)}
              />
            </View>
          ) : (
            ''
          )}
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              onChange={e => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Name sholud be more then 1 characters.
            </Text>
          )}
          <View style={styles.action}>
            <Fontisto
              name="email"
              color="#420475"
              size={24}
              style={{marginLeft: 0, paddingRight: 5}}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={e => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Enter Proper Email Address
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color="#420475"
              size={35}
              style={{paddingRight: 10, marginTop: -7, marginLeft: 5}}
            />
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              onChange={e => handleMobile(e)}
              maxLength={12}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Phone number starting with 9-11 and remaing 9 digit with 0-9
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{marginRight: -10}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{marginRight: -10}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Uppercase, Lowercase, Number and 6 or more characters.
            </Text>
          )}
        </View>
        <View style={[styles.action1, {marginHorizontal: 20}]}>
          <FontAwesome
            name="image"
            color="#420475"
            size={35}
            style={{paddingRight: 10, marginTop: -7, marginLeft: 5}}
          />
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <Text> Choose Photo</Text>
          </TouchableOpacity>
        </View>

        {image != null ? <AddImage source={{uri: image}} /> : ''}
        {uploading && (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        )}
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handelSubmit()}>
            <View>
              <Text style={styles.textSign}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 18, color: 'white'}}>
            Already Have An Account
          </Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.inBut3}
            onPress={() => {
              navigation.navigate('LoginPage');
            }}>
            <View>
              <Text style={styles.textSign1}>Login Here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default RegisterPage;
