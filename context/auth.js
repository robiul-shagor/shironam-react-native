import { useRouter, useSegments  } from 'expo-router'
import React, { useContext, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
    const segments = useSegments();

    const router = useRouter();
  
    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';
  
      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        //router.replace('/login');
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.replace('/home');
      }
    }, [user, segments]);
}

export function Provider(props) {
    const [user, setAuth] = useState(null);

    useEffect(() => {
        const checkUserLogin = async () => {
          // Check if the user is already logged in (e.g., token available in AsyncStorage).
          const userData = await AsyncStorage.getItem('userDetails');
          if (userData) {
            const userObj = JSON.parse(userData);
            setAuth(userObj);
          }
        };
        checkUserLogin();
    }, []);
  
    useProtectedRoute(user);

    const logIn = async (data) => {
        // Assuming that the API response contains the user details and the token.
        const { token, normal_user } = data;
        const userData = {
          token,
          normal_user,
        };
    
        // Store user details in AsyncStorage.
        await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
        setAuth(userData);
    };
    
    const logOut = async () => {
        // Remove user details from AsyncStorage on logout.
        await AsyncStorage.removeItem('userDetails');
        setAuth(null);
    };
  
    return (
        <AuthContext.Provider value={{ logIn, logOut, user }}>
            {props.children}
        </AuthContext.Provider>
    );
}
