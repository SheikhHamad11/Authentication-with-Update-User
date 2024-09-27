import React from 'react';
import { View, ScrollView } from 'react-native';
import ContactComponent from '../../components/ContactComponent'; // Adjust the path accordingly
import { Button } from 'react-native-elements';

const ContactScreen = ({navigation}) => {
  const contacts = [
    {
      name: 'Ahmer',
      phoneNumber: '+1234567890',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcV4yCfoqx6upOlVARQvi-nr5JZQA6s9nsOw&usqp=CAU',
    },
    {
      name: 'Hamza',
      phoneNumber: '+9876543210',
      avatarUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/46jQ7Bbeql1VW7a-MQkoBg/348s.jpg',
    },
    {
      name: 'Hamad',
      phoneNumber: '+9876543210',
      avatarUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeZcMQGtRuuDW0zAmlZD9W6RFDGLqTJQWGQ&usqp=CAU',
    },
    {
      name: 'Hassan',
      phoneNumber: '+9876543210',
      avatarUrl: 'https://media.designrush.com/agency_team_bios/114441/conversions/james-allen-thumb.jpg',
    },
    // Add more contacts as needed
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {contacts.map((contact, index) => (
        <ContactComponent key={index} {...contact} />
      ))}
      <View style={{marginTop: 10}}>
        <Button
          color={'red'}
          // style={styles.button}
          onPress={() => {
            navigation.navigate('About', {name: 'hamad', age: '30'});
          }}
          title="Go to About"
        />
      </View>
      <View style={{marginTop: 10}}>
        <Button
          color={'red'}
          // style={styles.button}
          onPress={() => {
            navigation.navigate('Home', {name: 'hamad', age: '30'});
          }}
          title="Go to Home"
        />
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
