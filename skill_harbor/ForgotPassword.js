import { get, set, ref } from 'firebase/database';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { realtimeDb } from './firebase/config';
import { removeSpecialCharacters } from './firebase/utils';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async () => {
    // Validate input fields
    if (email === '' || password === '' || confirmPassword === '') {
      alert('Please fill all the fields.');
      return;
    }
    const cleaned_email = removeSpecialCharacters(email); 
    const userRef = ref(realtimeDb, "user/" + cleaned_email); 
    const passRef = ref(realtimeDb, "user/" + cleaned_email + "/password"); 
    const snapshot = await get(userRef); 
    if (!(snapshot.exists())) {
        Alert.alert("There is no account with this username. Wrong email address!")
        return; 
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Implement your password reset logic here
    console.log("querying db for user data")
    if (snapshot.exists()) {
        console.log("New Password: ", password); 
        await set(passRef, password); 
        console.log("Password updated successfully");
    }
    try {
        console.log(email); 
        navigation.navigate('Log In');
      } catch (error) {
        console.error('Navigation error:', error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="New Password"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <Button title="Submit" onPress={handlePasswordReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default ForgotPasswordScreen;