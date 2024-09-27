import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
const AuthContext = createContext();

const initialState = {isAuthenticated: false};
// console.log('initialState', initialState);
const reducer = (state, {type}) => {
  switch (type) {
    case 'LOGIN': {
      return Object.assign({}, {isAuthenticated: true});
    }
    case 'LOGOUT': {
      return Object.assign({}, {isAuthenticated: false});
    }
    default:
      return state;
  }
};
export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // let count = 1;
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      // console.log(count++);
      // console.log('user:', user);
      if (user) {
        // console.log('user', user);
        setCurrentUser(user);
        dispatch({type: 'LOGIN'});
        // console.log('user is signed in');
      } else {
        console.log('user is signed out');
        // dispatch({type:"LOGOUT"})
      }
    });

    // Cleanup the subscription when the component unmounts
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{...state, isLoggedIn, setisLoggedIn, dispatch, currentUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
