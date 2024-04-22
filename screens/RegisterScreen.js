import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoRegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const handleRegisterPress = async () => {
        try {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }
            
            // Check if user already exists
            const existingUser = await AsyncStorage.getItem('userData');
            if (existingUser) {
                const existingUserData = JSON.parse(existingUser);
                if (existingUserData.username === username) {
                    Alert.alert('Error', 'Username already exists. Please choose a different one.');
                    return;
                }
            }
            
            // Store user data in AsyncStorage
            await AsyncStorage.setItem(`userData_${username}`, JSON.stringify({ 
                username, 
                password, 
                firstName, 
                lastName, 
                email 
            }));
            // Create an empty todos array for the new user
            await AsyncStorage.setItem(`todos_${username}`, JSON.stringify([]));
            
            // Log entire data after registration
            const allKeys = await AsyncStorage.getAllKeys();
            const allData = await AsyncStorage.multiGet(allKeys);
            console.log('All data in storage:', allData);
            // setLoggedInUser(username);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error storing user data:', error);
            Alert.alert('Error', 'An error occurred while registering. Please try again.');
        }
    };  
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input2}
                    placeholder="Firstname"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
                <View style={{ width: 10 }} />
                <TextInput
                    style={styles.input2}
                    placeholder="Lastname"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="EmailId"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter Password"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    secureTextEntry={!isConfirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                />
                <TouchableOpacity
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                    <MaterialIcons name={isConfirmPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.textButton, { backgroundColor: "#1e90ff" }]}
                onPress={handleRegisterPress}
            >
                <Text style={styles.buttonText}>
                    Register
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text>
                    Already have an account ?
                </Text>
                <Text> </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderColor: '#1e90ff',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 16,
        padding: 16,
        marginBottom: 10
    },
    input2: {
        width: '39%',
        borderColor: '#1e90ff',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 16,
        padding: 16,
        marginBottom: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: '#1e90ff',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        padding: 16,
    },
    textButton: {
        width: '80%',
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
})

export default TodoRegisterScreen;
