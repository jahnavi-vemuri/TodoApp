import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTodoContext, DELETE_TODO, TOGGLE_IMPT } from '../context/TodoContext';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback'; 
import TaskItem from '../components/TaskItem'

const TodoScreen = ({ navigation }) => {
  const { todos, dispatch } = useTodoContext();
  const [showImportant, setShowImportant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredImportantTodos = todos.filter(todo =>
    todo.isImportant && todo.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          onPress={handleShowImportant}
        >
          <IconButton icon="heart" size={30}/>
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
  button:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    padding: 8,
  }
})

export default TodoScreen;
