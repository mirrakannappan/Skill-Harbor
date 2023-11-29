import React from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Browse = ({ route, navigation }) => {
  // This data would typically come from your application's state or props
  const { teamname } = route.params;
  const matches = [
    { name: 'Ric', rating: 8.8 , age:22, skills:['Java', 'C++', 'C']},
    { name: 'Dawn', rating: 7.8, age: 20, skills:['Python', 'JavaScript', 'C']},
    { name: 'Mirra', rating: 7.6 , age:21, skills:['React', 'HTML', 'CSS']},
  ];

  const recommended = [
    { name: 'Adelia', rating: 8.6, age:20, skills:['Python', 'Git', 'Linux'] },
    { name: 'Jason', rating: 8.4, age: 22, skills:['R', 'C++', 'C'] },
  ];

  const confirmAddition = (name) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to add ${name} to your team?`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Yes Pressed");
            additionSuccessful(name); // Call another function to show the second alert
          }
        }
      ]
    );
  };

  const additionSuccessful = (name) => {
    Alert.alert(
      "Success",
      `You have added ${name} successfully!`,
      [
        { text: "OK", onPress: () => console.log('OK Pressed') }
      ]
    );
  };

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

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-left" size={24} color="#00507B" />
      </TouchableOpacity>

      <Text style={styles.header}>{teamname}</Text>
      <Text style={styles.subheader}>Potential matches:</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Profile', { name: match.name,  email: match.name + '@illinois.edu', age: match.age, skills: match.skills})} >
            <Text style={styles.name}>{match.name}</Text>
            <View style={styles.matchInfo}>
              <Text style={styles.rating}>{match.rating}</Text>
              <TouchableOpacity onPress={() => confirmAddition(match.name)}>
                <Icon name="check" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add navigation and other controls as necessary */}

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Icon name="home" size={30} color="#00507B" />
        </TouchableOpacity>
      </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00507B', // Dark blue background
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    padding: 20,
    marginTop: 40,
  },
  subheader: {
    fontSize: 22,
    fontFamily: 'RobotoSlab-Bold',
    color: '#FFF',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Regular',
    color: '#00507B',
  },
  rating: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    color: 'green',
    marginLeft: 10,
    marginRight: 30,
  },
  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  recommendation: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    width: width * 0.4, // Adjust the width as per your design requirement
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center', // Centers items on the cross axis
    // You can add more styles as needed
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
  backButton: {
    position: 'absolute',
    top: 20, // Adjust top and left as per your UI requirements
    marginTop: 40,
    left: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Make sure it's above other elements
  },
});

export default Browse;
