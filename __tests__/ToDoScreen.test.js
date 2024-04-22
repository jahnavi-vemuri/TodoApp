import React from 'react';
import renderer from 'react-test-renderer';
import TodoScreen from '../screens/ToDoScreen';
import { TodoProvider } from '../context/TodoContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Animated module
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('TodoScreen Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TodoProvider>
          <TodoScreen />
        </TodoProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle search input', () => {
    const component = renderer.create(
      <TodoProvider>
        <TodoScreen />
      </TodoProvider>
    );
    const instance = component.root;

    const searchInput = instance.findByProps({ placeholder: 'Search Todos' });
    searchInput.props.onChangeText('Test');

    expect(instance.findByProps({ placeholder: 'Search Todos' }).props.value).toBe('Test');
  });

//   it('should navigate to AddTodo screen on button press', () => {
//     const component = renderer.create(
//       <TodoProvider>
//         <TodoScreen />
//       </TodoProvider>
//     );
//     const instance = component.root;

//     const addButton = instance.findByProps({ testID: 'addButton' });
//     addButton.props.onPress();

//     expect(instance.instance.props.children.props.navigation.navigate).toHaveBeenCalledWith(
//       'AddTodo'
//     );
//   });
});
