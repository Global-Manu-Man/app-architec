import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserAuth } from './context/userAuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useUserAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      navigation.navigate('Profile');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  linkText: {
    color: 'blue',
  },
});

export default Login;
