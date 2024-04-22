import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useTodoContext, SET_TODOS } from '../context/TodoContext'; // Import SET_TODOS and LOGIN_USER

const TodoLoginScreen = ({ navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { dispatch, loginUser } = useTodoContext(); // Get dispatch function from context

    const handleLoginPress = async () => {
        try {
            const userDataKeys = await AsyncStorage.getAllKeys();
            const userDataEntries = await AsyncStorage.multiGet(userDataKeys.filter(key => key.startsWith('userData_')));
            const users = userDataEntries.map(([_, data]) => JSON.parse(data));
            
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username: user.username }));
                loginUser(user.username); // Dispatch LOGIN_USER action
                // Retrieve todos data for the logged-in user
                const userTodosKey = `todos_${user.username}`;
                const todosData = await AsyncStorage.getItem(userTodosKey);
                if (todosData) {
                    const todos = JSON.parse(todosData);
                    console.log(`Todos for user: ${user.username}`, todos);
    
                    // Update todos with user property
                    const todosWithUser = todos.map(todo => ({ ...todo, user: user.username }));
                    dispatch({ type: SET_TODOS, payload: todosWithUser });
                } else {
                    console.log(`No todos found for user: ${user.username}`);
                }
    
                navigation.navigate('Todo');
            } else {
                Alert.alert('Error', 'Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error retrieving user data from AsyncStorage:', error);
            Alert.alert('Error', 'An error occurred while logging in. Please try again.');
        }
    };   
    
    // const handleLoginPress = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
    //         const user = response.data[0]; // Assuming the response is an array with a single user object
            
    //         if (user) {
    //             // Store logged-in user data in the context
    //             dispatch({ type: LOGIN_USER, payload: user });

    //             // Retrieve todos data for the logged-in user
    //             const todosResponse = await axios.get(`${API_URL}/todos?username=${user.username}`);
    //             const todos = todosResponse.data;
    //             console.log(`Todos for user: ${user.username}`, todos);

    //             // Update todos with user property
    //             const todosWithUser = todos.map(todo => ({ ...todo, user: user.username }));
    //             dispatch({ type: SET_TODOS, payload: todosWithUser });

    //             navigation.navigate('Todo');
    //         } else {
    //             Alert.alert('Error', 'Invalid username or password. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error logging in:', error);
    //         Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    //     }
    // };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <View style={[styles.passwordContainer, styles.input]}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.textButton, { backgroundColor: "#1e90ff" }]}
                onPress={handleLoginPress}
            >
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
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

