import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
// import firestore from '@react-native-firebase/firestore';
import ScreenLoader from '../../components/ScreenLoader';
import {FlatList} from 'react-native';
export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const fetchDocuments = () => {
  //   firestore()
  //     .collection('users')
  //     .get()
  //     .then(querySnapshot => {
  //       console.log('Total users:', querySnapshot.size);

  //       querySnapshot.forEach(documentSnapshot => {
  //         let data = {id: documentSnapshot.id, ...documentSnapshot.data()};
  //         // const data = Object.values(documentSnapshot.val());
  //         // console.log('data', data);
  //         setItems(data.data);
  //         console.log(
  //           'User ID: ',
  //           documentSnapshot.id,
  //           documentSnapshot.data(),
  //         );
  //       });
  //     });
  // };

  // useEffect(() => {
  //   fetchDocuments();
  // }, []);

  return (
    <>
  
      {isLoading ? (
        <View>
          {
            <FlatList
              data={items}
              renderItem={({item}) => (
                <>
                  <Text style={{fontSize: 20, color: 'red'}}>
    
                    {item.email}
                  </Text>
                  <Text style={{color:"red",fontSize:30}}>{'Home'}</Text>

                </>
              )}
              keyExtractor={item => item.id}
            />
          }
        </View>
      ) : (
        <ScreenLoader />
      )}
    </>
  );
}
