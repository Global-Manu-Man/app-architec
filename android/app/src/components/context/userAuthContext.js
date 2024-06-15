import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const userAuthContext = createContext(null);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth,
    );
    recaptchaVerifier.render();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth', currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        resetPassword,
        setUpRecaptha,
        signInWithPhoneNumber,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthContextProvider");
  }
  return context;
}
