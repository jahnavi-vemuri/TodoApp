import React from 'react';
import { Text, TouchableOpacity, TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoProvider, useTodoContext } from '../context/TodoContext'; // Import TodoProvider and useTodoContext
import LoginScreen from '../screens/LoginScreen';

// Mock AsyncStorage functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
}));

// Mock navigation prop
const mockNavigation = {
  navigate: jest.fn()
};

// Mock useTodoContext hook
jest.mock('../context/TodoContext', () => ({
  ...jest.requireActual('../context/TodoContext'),
  useTodoContext: jest.fn(),
}));

describe('<LoginScreen />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    useTodoContext.mockReturnValue({ dispatch: jest.fn(), loginUser: jest.fn() });
    const tree = renderer.create(
      <TodoProvider>
        <LoginScreen navigation={mockNavigation} />
      </TodoProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('logs in successfully with correct credentials', async () => {
    AsyncStorage.getAllKeys.mockResolvedValueOnce(['userData_test']);
    AsyncStorage.multiGet.mockResolvedValueOnce([['userData_test', '{"username":"test","password":"test"}']]);
    useTodoContext.mockReturnValue({ dispatch: jest.fn(), loginUser: jest.fn() });

    const component = renderer.create(
      <TodoProvider>
        <LoginScreen navigation={mockNavigation} />
      </TodoProvider>
    );
    const instance = component.root;

    const usernameInput = instance.findByProps({ testID: 'usernameInput' });
    const passwordInput = instance.findByProps({ testID: 'passwordInput' });
    const loginButton = instance.findByProps({ testID: 'loginButton' });

    usernameInput.props.onChangeText('test');
    passwordInput.props.onChangeText('test');
    await loginButton.props.onPress();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('loggedInUser', JSON.stringify({ username: 'test' }));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Todo');
  });

  test('displays an error message with incorrect credentials', async () => {
    AsyncStorage.getAllKeys.mockResolvedValueOnce(['userData_test']);
    AsyncStorage.multiGet.mockResolvedValueOnce([['userData_test', '{"username":"test","password":"test"}']]);
    useTodoContext.mockReturnValue({ dispatch: jest.fn(), loginUser: jest.fn() });

    const component = renderer.create(
      <TodoProvider>
        <LoginScreen navigation={mockNavigation} />
      </TodoProvider>
    );
    const instance = component.root;

    const usernameInput = instance.findByProps({ testID: 'usernameInput' });
    const passwordInput = instance.findByProps({ testID: 'passwordInput' });
    const loginButton = instance.findByProps({ testID: 'loginButton' });

    usernameInput.props.onChangeText('wrong_user');
    passwordInput.props.onChangeText('wrong_password');
    await loginButton.props.onPress();

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  test('displays an error message when AsyncStorage throws an error', async () => {
    AsyncStorage.getAllKeys.mockRejectedValueOnce('AsyncStorage error');
    useTodoContext.mockReturnValue({ dispatch: jest.fn(), loginUser: jest.fn() });

    const component = renderer.create(
      <TodoProvider>
        <LoginScreen navigation={mockNavigation} />
      </TodoProvider>
    );
    const instance = component.root;

    const usernameInput = instance.findByProps({ testID: 'usernameInput' });
    const passwordInput = instance.findByProps({ testID: 'passwordInput' });
    const loginButton = instance.findByProps({ testID: 'loginButton' });

    usernameInput.props.onChangeText('test');
    passwordInput.props.onChangeText('test');
    await loginButton.props.onPress();

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });
});
