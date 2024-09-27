import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';

import {
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../components/AddPost';
// import {useAuthContext} from '../context/AuthContext';
import {Input} from 'react-native-elements';
import {Button} from 'react-native';
import {useAuthContext} from '../context/AuthContext';

// import {Input, Icon} from 'react-native-elements';
// import ImagePicker from 'react-native-image-picker';

export default function RegisterPage({navigation}) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const {dispatch} = useAuthContext();
  // const pickImage = async () => {
  //   ImagePicker.launchImageLibrary({}, async response => {
  //     if (response.didCancel) {
  //       // console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Handle the selected image
  //       const source = {uri: response.uri};
  //       // Now you can upload this image to Firebase Storage
  //       uploadImage(response.uri);
  //     }
  //   });
  // };

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 1200,
  //     height: 780,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //   });
  // };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      // width: 1200,
      // height: 1200,
      cropping: true,
    }).then(image => {
      // console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const handleRegister = async imageUrl => {
    // console.log('firstName:', firstName);
    // console.log('lastName', lastName);
    // console.log('Email:', email);
    // console.log('Password:', password);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
        // console.log('Image Url: ', imageUrl);
      }
      // Step 1: Create user in Firebase Authentication
      if (imageUrl) {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        // console.log('User registered:', user);
        // navigation.navigate('Login');
        // Step 2: Upload the image

        // Step 3: Add user details to Firestore
        await user.updateProfile({
          displayName: `${firstName} ${lastName}`,
          photoURL: imageUrl,
        });
        await firestore()
          .collection('posts')
          .add({
            post: post,
            postImg: imageUrl,
            postTime: firestore.Timestamp.fromDate(new Date()),
            firstName,
            lastName,
            email,
            uid: user.uid,
          });

        // Step 4: Update user profile

        // console.log('User added!');
        Alert.alert(
          'Post published!',
          'Your post has been published successfully!',
        );
        // navigation.navigate("Login")
        dispatch({type: 'LOGIN'});
        setPost(null);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };

  // Function to handle image upload
  const uploadImage = async imageUri => {
    const uploadUri = imageUri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      // console.log(
      //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      const temp = await task;
      // console.log('temp', temp);
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage(null);
      // console.log('Image uploaded. URL:', url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setfirstName(text)}
        value={firstName}
      />
      <Input
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setlastName(text)}
        value={lastName}
      />
      <Input
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Input
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        buttonColor="#3498db"
        title="Choose Photo"
        onPress={choosePhotoFromLibrary}>
        <Icon name="md-images-outline" style={styles.actionButtonIcon} />
      </Button>
      {/* <InputWrapper> */}
      {image != null ? <AddImage source={{uri: image}} /> : ''}
      {
        uploading && (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        )
        // : (
        //   <SubmitBtn onPress={uploadImage}>
        //     <SubmitBtnText>Upload</SubmitBtnText>
        //   </SubmitBtn>
        // )
      }
      {/* </InputWrapper> */}

      <View style={{marginVertical: 20, padding: 20}}>
        <Button color="#000000" title="Register" onPress={handleRegister} />
      </View>
      <View>
        <Text style={{fontSize: 20, color: 'white', marginBottom: 10}}>
          Already have Account
        </Text>
        <Button
          color="#421008"
          title="Login Here"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'skyblue',
  },
  title: {
    fontSize: 40,
    marginBottom: 16,
    color: 'white',
  },

  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
