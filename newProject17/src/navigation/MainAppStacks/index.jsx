import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateProfile from '../../screens/UpdateProfile/UpdateProfile';
import HomeScreen from '../../screens/frontend/Home';
import AboutScreen from '../../screens/frontend/About';
import ContactScreen from '../../screens/frontend/Contact';
import ProfileScreen from '../../screens/DrawerScreens/ProfileScreen';
import UserScreen from '../../screens/DrawerScreens/UserScreen';
import Library from '../../screens/DrawerScreens/Library';

export const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Library" component={Library} />
      {/* <Drawer.Screen name="RootHome" component={MainStack} /> */}
    </Drawer.Navigator>
  );
};

export default function MainStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: '#0163d2',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="DrawerNav" component={DrawerNav} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}

      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
