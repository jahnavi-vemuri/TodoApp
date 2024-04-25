import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useTodoContext, SET_TODOS } from '../context/TodoContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

const TodoLoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { dispatch, loginUser } = useTodoContext(); 

  const buttonOpacity = useSharedValue(0);
  const buttonPositionX = useSharedValue(-1000);
  const buttonPositionY = useSharedValue(0);

  const fadeInButton = () => {
    buttonOpacity.value = withTiming(1, { duration: 1000 });
    buttonPositionX.value = withTiming(0, { duration: 1000 });
  };

  const moveButton = () =>{
    buttonPositionX.value = withTiming(1000, {duration: 1000});
  }

  const bounceButton = () =>{
    buttonPositionY.value = withSpring(-20, { stiffness: 100 });
    setTimeout(() => {
      buttonPositionY.value = withSpring(0, { stiffness: 100 });
    }, 300);
  }

  React.useEffect(() => {
    fadeInButton();
  }, []);

  const handleLoginPress = async () => {
    if (!username && !password) {
      bounceButton();
        setTimeout(() =>{
            Alert.alert('Error','Username and password are required.');
      },500);
      return;
    }
    try {
      const userDataKeys = await AsyncStorage.getAllKeys();
      const userDataEntries = await AsyncStorage.multiGet(userDataKeys.filter(key => key.startsWith('userData_')));
      const users = userDataEntries.map(([_, data]) => JSON.parse(data));
      
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username: user.username }));
        loginUser(user.username);

        const userTodosKey = `todos_${user.username}`;
        const todosData = await AsyncStorage.getItem(userTodosKey);
        if (todosData) {
          const todos = JSON.parse(todosData);
          const todosWithUser = todos.map(todo => ({ ...todo, user: user.username }));
          dispatch({ type: SET_TODOS, payload: todosWithUser });
        }

        // navigation.navigate('Todo');
        moveButton();
        setTimeout(() => {
          navigation.navigate('Todo');
          fadeInButton();
        }, 500);
      } else {
        bounceButton();
        setTimeout(() =>{
            Alert.alert('Error', 'Invalid username or password. Please try again.');
      },500);
    }
    } catch (error) {
        bounceButton();
      console.error('Error retrieving user data from AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    }
  };   

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ translateX: buttonPositionX.value }, { translateY: buttonPositionY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        testID="usernameInput"
      />
      <View style={[styles.passwordContainer, styles.input]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
          testID="passwordInput"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          testID="passwordVisibilityButton"
        >
          <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.textButton, { backgroundColor: "#1e90ff" }, buttonAnimatedStyle]}>
        <TouchableOpacity
          onPress={handleLoginPress}
          testID="loginButton" 
        >
          <Text style={styles.buttonText}>
              Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={{ flexDirection: 'row' }}>
        <Text>
          Doesn't have an account ?
        </Text>
        <Text> </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
              Register
          </Text>
        </TouchableOpacity>
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
  input: {
    width: '80%',
    borderColor: '#1e90ff',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    padding: 16,
    marginBottom: 10
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  textButton: {
    width: '80%',
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default TodoLoginScreen;
