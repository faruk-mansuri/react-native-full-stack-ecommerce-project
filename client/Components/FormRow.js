import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const FormRow = ({ label, placeholder, name, value, handleChange }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        value={value}
        onChangeText={(value) => handleChange(name, value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default FormRow;
