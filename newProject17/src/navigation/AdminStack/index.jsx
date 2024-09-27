import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminScreen from '../../screens/frontend/AdminScreen';

export const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
        name="Admin"
        component={AdminScreen}
      />
    </Stack.Navigator>
  );
};
