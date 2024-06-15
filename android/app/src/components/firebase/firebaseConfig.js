// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJodg94Djx7ksGDRpnABv53Q8jz4xr0PI',
  authDomain: 'archi-planner-android.firebaseapp.com',
  projectId: 'archi-planner-android',
  storageBucket: 'archi-planner-android.appspot.com',
  messagingSenderId: '106187450085',
  appId: '1:106187450085:android:9949a4803cb7d217b8160c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
   