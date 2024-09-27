import {Button} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

function UserScreen({navigation}) {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>This is User Screen</Text>
      <Button
        title="Go to Library"
        onPress={() => navigation.navigate('Library')}
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
export default UserScreen;
