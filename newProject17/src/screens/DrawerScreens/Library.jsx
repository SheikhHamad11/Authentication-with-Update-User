import {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

function ProfileScreen(props) {
  console.log(props);
  useEffect(() => {
    console.log('Hii');
  }, []);
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>This is Library Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: 28,
    color: 'black',
  },
  headingStyle: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});
export default ProfileScreen;
