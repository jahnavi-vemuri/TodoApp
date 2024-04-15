import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Text } from 'react-native';
import { useTodoContext, DELETE_TODO, TOGGLE_IMPT, SET_TODOS, LOGOUT_USER } from '../context/TodoContext';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback'; 
import TaskItem from '../components/TaskItem';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
  const { todos, dispatch, loggedInUser } = useTodoContext();
  const [showImportant, setShowImportant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
  const fetchUserTodos = async () => {
    try {
      if (loggedInUser) {
        const userTodosKey = `todos_${loggedInUser}`;
        const todosData = await AsyncStorage.getItem(userTodosKey);
        if (todosData) {
          const todos = JSON.parse(todosData);
          dispatch({ type: SET_TODOS, payload: todos });
        } else {
          console.log(`No todos found for user: ${loggedInUser}`);
        }
      }
    } catch (error) {
      console.error('Error retrieving user data from AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while fetching todos. Please try again.');
    }
  };

  fetchUserTodos();
}, [dispatch, loggedInUser]);


  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const handleEditTodo = (item) => {
    navigation.navigate('AddTodo', { todo: item });
  };

  const handleToggleImportant = (id) => {
    dispatch({ type: TOGGLE_IMPT, payload: id });
  };

  const handleShowImportant = () => {
    setShowImportant(!showImportant);
  };

  const handleLogout = async () => {
    try {
      // Log the user and data before logout
      console.log('Logging out user:', loggedInUser);
      console.log('User data before logout:', todos);
  
      // Remove loggedInUser from AsyncStorage
      await AsyncStorage.removeItem('loggedInUser');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    }
  };
  

  const filteredTodos = todos.filter(todo =>
    todo.user === loggedInUser && todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredImportantTodos = todos.filter(todo =>
    todo.user === loggedInUser && todo.isImportant && todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.searchText}
          placeholder="Search Todos"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.imp}
          onPress={handleShowImportant}>
          <IconButton icon={showImportant ? 'heart' : 'heart-outline'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <IconButton icon="logout" size={30} />
          <Text>{/* Example logout icon */}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        {showImportant ? (
          filteredImportantTodos.length === 0 ? (
            <Fallback />
          ) : (
            <FlatList
              data={filteredImportantTodos}
              renderItem={({ item }) => (
                <TaskItem item={item} onDelete={handleDelete} onEdit={handleEditTodo} onToggleImportant={handleToggleImportant} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        ) : (
          filteredTodos.length === 0 ? (
            <Fallback />
          ) : (
            <FlatList
              data={filteredTodos}
              renderItem={({ item }) => (
                <TaskItem item={item} onDelete={handleDelete} onEdit={handleEditTodo} onToggleImportant={handleToggleImportant} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <IconButton icon="plus" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10 
  },
  searchText:{
    flex: 1, 
    borderWidth: 2, 
    borderColor: '#1e90ff', 
    borderRadius: 5, 
    padding: 10, 
    marginRight: 1
  },
  imp:{
    borderRadius: 20, 
    padding: 3
  },
  logoutButton: {
    marginLeft: 10,
  },
  button:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    padding: 8,
  }
});

export default TodoScreen;
