import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoProvider } from './context/TodoContext';
import TodoScreen from './screens/ToDoScreen';
import AddTodoScreen from './screens/AddToDoScreen';
import TodoLoginScreen from './screens/LoginScreen';
import TodoRegisterScreen from './screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const App = () => {
  //   useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('AsyncStorage cleared successfully.');
  //     } catch (error) {
  //       console.error('Error clearing AsyncStorage:', error);
  //     }
  //   };

  //   clearAsyncStorage();
  // }, []);
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
          name="Login"
          component={TodoLoginScreen}
          options={{title:'Login'}}
          />
          <Stack.Screen
          name="Register"
          component={TodoRegisterScreen}
          options={{title:'Register'}}
          />
          <Stack.Screen
            name="Todo"
            component={TodoScreen}
            options={{ title: 'Todos' }}
          />
          <Stack.Screen
            name="AddTodo"
            component={AddTodoScreen}
            options={({ route }) => ({
              title: route.params?.todo ? 'Update Todo' : 'Add Todo'
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
};

export default App;
