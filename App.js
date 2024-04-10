import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import ToDoScreen from './src/ToDoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddToDoScreen from './src/AddToDoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="ToDo">
          <Stack.Screen name="ToDo" component={ToDoScreen} />
          <Stack.Screen name="AddToDo" component={AddToDoScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
