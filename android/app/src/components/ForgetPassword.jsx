import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserAuth } from './context/userAuthContext';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useUserAuth();

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      alert('Password reset email sent!');
      setEmail(''); // Limpia el campo de entrada
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Email" onPress={handleResetPassword} />
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
});

export default ForgetPassword;
