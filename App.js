import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoProvider } from './context/TodoContext';
import TodoScreen from './screens/ToDoScreen';
import AddTodoScreen from './screens/AddToDoScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Todo">
          <Stack.Screen
            name="Todo"
            component={TodoScreen}
            options={{ title: 'Todo List' }}
          />
          <Stack.Screen
            name="AddTodo"
            component={AddTodoScreen}
            options={{ title: 'Add Todo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
};

export default App;