import React from 'react';
import renderer from 'react-test-renderer';
import AddTodoScreen from '../screens/AddToDoScreen';
import { TodoProvider } from '../context/TodoContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock moment
jest.mock('moment', () => () => ({
  format: (format) => '01/01/2023',
}));

describe('AddTodoScreen', () => {
  it('renders correctly', () => {
    const route = {
      params: {}
    };
    const tree = renderer
      .create(
        <TodoProvider>
          <AddTodoScreen route={route} />
        </TodoProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets todo value correctly', () => {
    const route = {
      params: {}
    };
    const component = renderer.create(
      <TodoProvider>
        <AddTodoScreen route={route} />
      </TodoProvider>
    );
    const instance = component.root;
    const input = instance.findByProps({ placeholder: 'Add Todo' });
    input.props.onChangeText('Test Todo');
    expect(input.props.value).toBe('Test Todo');
  });

  it('handles date selection correctly', () => {
    const route = {
      params: {}
    };
    const component = renderer.create(
      <TodoProvider>
        <AddTodoScreen route={route} />
      </TodoProvider>
    );
    const instance = component.root;
    const dateInput = instance.findByProps({ placeholder: 'Set date (optional)' });
    expect(dateInput.props.editable).toBeFalsy();
  });

  it('handles time selection correctly', () => {
    const route = {
      params: {}
    };
    const component = renderer.create(
      <TodoProvider>
        <AddTodoScreen route={route} />
      </TodoProvider>
    );
    const instance = component.root;
    const timeInput = instance.findByProps({ placeholder: 'Set time (optional)' });
    expect(timeInput.props.editable).toBeFalsy();
  });

//   it('calls handleSaveTodo function correctly', () => {
//     const route = {
//       params: {}
//     };
//     const navigation = {
//       goBack: jest.fn(),
//     };
//     const component = renderer.create(
//       <TodoProvider>
//         <AddTodoScreen navigation={navigation} route={route} />
//       </TodoProvider>
//     );
//     const instance = component.root;
//     const saveButton = instance.findByProps({ testID: 'saveButton' });
//     saveButton.props.onPress();
//     expect(navigation.goBack).toHaveBeenCalled();
//   });
});
