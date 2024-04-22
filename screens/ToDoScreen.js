import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Animated } from 'react-native';
import { useTodoContext, DELETE_TODO, TOGGLE_IMPT, SET_TODOS, LOGOUT_USER } from '../context/TodoContext';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback'; 
import TaskItem from '../components/TaskItem';
import { useNavigation } from '@react-navigation/native';

const TodoScreen = () => {
  const { todos, dispatch, loggedInUser } = useTodoContext();
  const [showImportant, setShowImportant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Add isSearchFocused state
  const navigation = useNavigation();
  const animationValue = useRef(new Animated.Value(1)).current;
  const animationValues = useRef(new Map()).current;

  const animatedButton = (callback) =>{
    Animated.sequence([
      Animated.timing(animationValue,{
        toValue: 0.5,
        // duration: 700, 
        useNativeDriver: true,
      }),
      Animated.timing(animationValue,{
        toValue: 1,
        // duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (callback) {
        callback();
      }
    });
  };

  const animatedValue = (id) => {
    if (!animationValues.has(id)) {
      animationValues.set(id, new Animated.Value(0));
    }
    return animationValues.get(id);
  };

  const animateItemEntrance = (id) => {
    Animated.timing(animatedValue(id), {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Animate item entrance for each todo item
    todos.forEach(todo => {
      animateItemEntrance(todo.id);
    });
  }, [todos]);

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
          style={[styles.searchText, { borderColor: isSearchFocused ? '#1e90ff' : '#ccc' }]} // Dynamic border color
          placeholder="Search Todos"
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)} // Handle focus
          onBlur={() => setIsSearchFocused(false)} // Handle blur
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.imp}
          onPress={handleShowImportant}>
          <IconButton icon={showImportant ? 'heart' : 'heart-outline'} size={30} />
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
                <Animated.View
                  style={{
                    opacity: animatedValue(item.id),
                    transform: [
                      {
                        translateY: animatedValue(item.id).interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}>
                  <TaskItem item={item} onDelete={handleDelete} onEdit={handleEditTodo} onToggleImportant={handleToggleImportant} />
                </Animated.View>
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
                <Animated.View
                  style={{
                    opacity: animatedValue(item.id),
                    transform: [
                      {
                        translateY: animatedValue(item.id).interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}>
                  <TaskItem item={item} onDelete={handleDelete} onEdit={handleEditTodo} onToggleImportant={handleToggleImportant} />
                </Animated.View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        )}
      </View>
      <TouchableOpacity
        testID='addButton'
        style={[styles.button, { transform: [{ scale: animationValue }] }]}
        onPress={
          () => 
          {
            animatedButton(() => {
              navigation.navigate('AddTodo');
            });
          }
      }
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
    elevation: 5,
  }
});

export default TodoScreen;
