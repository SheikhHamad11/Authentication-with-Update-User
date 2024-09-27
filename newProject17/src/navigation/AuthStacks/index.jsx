import LoginPage from '../../auth/Login';
import RegisterPage from '../../auth/Register';
import ForgotPage from '../../auth/ForgotPassword';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const AuthStacks = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Forgot" component={ForgotPage} />
    </Stack.Navigator>
  );
};
