import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Linking,
  FlatList,
  TextInput,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useAuthContext} from '../../context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
function AdminScreen({navigation}) {
  // const navigation = useNavigation();
  // const {dispatch} = useAuthContext();
  // console.log(props);
  const [allUserData, setAllUserData] = useState('');
  const [userData, setUserData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtreredUsers, setFilteredUsers] = useState([]);
  const {isLoggedIn, setisLoggedIn} = useAuthContext();
  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post('http://192.168.60.27:5001/userdata', {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }

  async function getAllData() {
    axios.get('http://192.168.60.27:5001/get-all-user').then(res => {
      // console.log(res.data);

      setAllUserData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  const handleChange = query => {
    setSearchQuery(query);
    const filtered = allUserData.filter(user => {
      console.log('user', query);
      return user?.email?.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handlebackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {text: 'cancel', onPress: () => null, style: 'cancel'},
      {
        text: 'exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handlebackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handlebackPress);
      };
    }),
  );

  const handleDelete = data => {
    axios
      .post('http://192.168.60.27:5001/delete-user', {id: data._id})
      .then(res => {
        // console.warn(res.data);
        if (res.data.status == 'Ok') {
          getAllData();
        }
      });
  };

  const handleLogOut = () => {
    // dispatch({type: 'LOGOUT'});
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');

    setisLoggedIn(false);
    // navigation.navigate('LoginNav');
  };

  const UserCard = ({data}) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            data.image == '' || data.image == null
              ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
              : data.file,
          uri: `http://192.168.60.27:5001/${data?.file?.replace(
            'uploads\\',
            '',
          )}`,
        }}
        style={styles.image}
      />
      <View style={styles.cardDetails}>
        {/* <Text style={styles.name}>{data.name}</Text> */}
        <Text style={styles.email}>{data.email}</Text>
        <Text style={styles.userType}>{data.userType}</Text>
      </View>
      <View>
        <Icon
          name="trash"
          size={18}
          color={'red'}
          onPress={() => handleDelete(data)}
        />
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Icon name="search" size={18} color={'black'} />
          <TextInput
            style={styles.textInput}
            placeholder="Search Email or name"
            placeholderTextColor={'black'}
            value={searchQuery}
            onChangeText={handleChange}
          />
        </View>
        <Text style={styles.textBar}>
          Total Records:{' '}
          {searchQuery.length > 0
            ? `${filtreredUsers.length}`
            : `${allUserData.length}`}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userType}>{userData.userType}</Text>
        </View>
        <FlatList
          data={searchQuery.length > 0 ? filtreredUsers : allUserData}
          keyExtractor={item => item._id}
          renderItem={({item}) => <UserCard data={item} />}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => handleLogOut()}
        style={{
          backgroundColor: '#0163d2',
          width: '100%',
          borderRadius: 0,
          margin: 0,
        }}
        labelStyle={{fontSize: 16}}>
        Log Out
      </Button>
    </>
  );
}
const styles = StyleSheet.create({
  searchIcon: {
    padding: 15,
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {marginLeft: 10, color: 'black'},
  textBar: {
    color: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  userType: {
    fontSize: 18,
    color: '#777777',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#777777',
  },
});
export default AdminScreen;
