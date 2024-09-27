import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const AboutComponent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/144.png')} // Replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ESP Inspire</Text>
      <Text style={styles.subtitle}>Innovate. Create. Inspire.</Text>
      <Text style={styles.description}>
        ESP Inspire is a leading technology company dedicated to creating innovative solutions that inspire and transform businesses. With a focus on cutting-edge technologies and a passion for excellence, we strive to deliver unparalleled services to our clients.
      </Text>
      <Text style={styles.sectionTitle}>Our Vision</Text>
      <Text style={styles.description}>
        To be a global leader in technology, driving positive change and innovation in every project we undertake.
      </Text>
      {/* Add more sections as needed */}
      <View style={{marginTop: 10}}>
        <Button
          color={'red'}
          style={styles.button}
          onPress={() => {
            navigation.navigate('Contact', {name: 'hamad', age: '30'});
          }}
          title="Go to Contact"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Set your desired background color
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color:"black"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
});

export default AboutComponent;
