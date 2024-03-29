import React, { useState } from 'react';
import { Image, Alert} from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { onPressTest, checkUserLogin, deleteData } from './firebase/utils'



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (email, password) => {
    console.log(email);
    console.log(password);
    if (email == ''){
      Alert.alert("Please enter your email")
      return;
    }
    else if (password == ''){
      Alert.alert("Please enter your password")
      return;
    }

    flag = await checkUserLogin(email, password);
    if (flag == true){
      try {
        console.log(email); 
        console.log('Navigating to Home...');
        navigation.navigate('Home', {email: email});
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} >
      <KeyboardAvoidingView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image
        source={require('skill_harbor/assets/logo.png')} // Replace with the correct path to your local image
        style={styles.logo} // You may need additional styling for your image
        />
        <Text style={styles.logoText}>Skill Harbor</Text>
      </View>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword} 
        />
      </View>
      <TouchableOpacity
        onPress={() => {navigation.navigate('ForgotPassword')}}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => handleLogIn(email, password)}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {navigation.navigate('SignUp')}}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Don’t have account? 
        <Text style={styles.SignInText}> SIGN UP</Text>
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  scrollView: {
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 16.877,
    flexShrink: 0,
  },
  logo: {
    // If you want to specify the size of the logo or any other style:
    marginTop: 90,
    width: 200, // Set the width as needed
    height: 100, // Set the height as needed
    resizeMode: 'contain', // Ensures the image is scaled to fit within the container
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00507B',
    fontFamily: 'RobotoSlab-ExtraBold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00507B',
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    fontFamily: 'RobotoSlab-Bold',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00507B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular'
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    color: 'blue',

    fontFamily: 'RobotoSlab-Regular'
  },
  signInButton: {
    backgroundColor: '#00507B',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'RobotoSlab-Medium'
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'black',
    fontFamily: 'RobotoSlab-Regular',
    alignSelf: 'center',
  },
  SignInText: {
    fontFamily: 'RobotoSlab-Bold',
    left: 20,
  },
});

export default LoginScreen;
