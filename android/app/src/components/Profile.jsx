import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useUserAuth } from './context/userAuthContext';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
const { user, logOut } = useUserAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logOut();
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión después de cerrar sesión
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No user logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user.email}</Text>
      <View style={styles.logoutButtonContainer}>
        <Button title="LOG OUT" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  logoutButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: 'red',
  },
});

export default Profile;
