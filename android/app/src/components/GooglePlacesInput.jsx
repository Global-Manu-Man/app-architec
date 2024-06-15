import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar negocios"
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCkHa0yg-dT3-WO5McPLxMgiN0McfjRd8o', // Asegúrate de que esta clave es correcta
        language: 'es',
      }}
      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 5,
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 5,
          marginBottom: 16,
        },
        textInput: {
          height: 40,
          color: '#333',
          fontSize: 16,
          paddingLeft: 10,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
};

export default GooglePlacesInput;
