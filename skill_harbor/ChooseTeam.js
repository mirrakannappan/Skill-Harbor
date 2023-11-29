import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChooseTeam = ({navigation}) => {

  const handleHomePress = () => {
    // Show a confirmation dialog before navigating to the HomeScreen
    Alert.alert(
      'Confirmation',
      'Are you sure you want to go to the home? Your progress will not be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Home button pressed - confirmed');
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

    return (
        <View style={styles.container}>
        <Text style={styles.header}>CURRENT TEAMS:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'Fantastic Six' })} >
            <Text style={styles.buttonText}>Fantastic Six</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'TeamWin' })} >
            <Text style={styles.buttonText}>TeamWin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'AMAZ' })} >
            <Text style={styles.buttonText}>AMAZ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Icon name="home" size={30} color="#00507B" />
        </TouchableOpacity>

        </View>

        
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00507B', // Assuming a navy blue background
  },
  header: {
    fontSize: 24,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 40,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    width: '80%', // Assuming the buttons take up 80% of container width
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#00507B',
    fontFamily: 'RobotoSlab-Regular',
    fontSize: 20,
    // Add additional styling to match the design
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FFF', // White button color
    padding: 20,
    borderRadius: 50, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
  },
});

export default ChooseTeam;
