// TodoScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTodoContext, DELETE_TODO } from './TodoContext';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback'; // Import Fallback component

const TodoScreen = ({ navigation }) => {
  const { todos, dispatch } = useTodoContext();

  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const handleEditTodo = (item) => {
    navigation.navigate('AddTodo', { todo: item });
  };

  return (
    <View style={{ flex: 1 }}>
      {todos.length === 0 ? (
        <Fallback />
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#1e90ff',
                borderRadius: 10,
                paddingHorizontal: 6,
                paddingVertical: 8,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
              }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>
                    {item.date instanceof Date ? item.date.toDateString() : item.date}
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>
                    {item.time instanceof Date ? item.time.toLocaleTimeString() : item.time}
                  </Text>
                </View>
              </View>
              <IconButton
                icon="pencil"
                color="#fff"
                onPress={() => handleEditTodo(item)}
              />
              <IconButton
                icon="trash-can"
                color="#fff"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#1e90ff',
          borderRadius: 50,
          padding: 8,
        }}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <IconButton icon="plus" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoScreen;
