import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useUserAuth } from './context/userAuthContext';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login'); // Soluciona el problema de tipo
    }
  }, [user, navigation]);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
