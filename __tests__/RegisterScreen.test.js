import React from 'react';
import renderer from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, TextInput } from 'react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';

// Mock AsyncStorage functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock NavigationContainer
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock BackHandler
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');
  return {
    ...ActualReactNative,
    BackHandler: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});

jest.mock('react-native/Libraries/Settings/Settings', () => {
  const SettingsManager = {
    settings: {
      RNDeviceInfo: {
        uniqueId: 'unique-id',
      },
    },
  };
  return SettingsManager;
});

describe('<TodoRegisterScreen />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const tree = renderer
      .create(
        <NavigationContainer>
          <RegisterScreen />
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

//   test('registers successfully with correct credentials', async () => {
//     AsyncStorage.getItem.mockResolvedValueOnce(null);
//     AsyncStorage.setItem.mockResolvedValueOnce(null);
//     const navigate = jest.fn();
//     const tree = renderer
//       .create(
//         <NavigationContainer>
//           <RegisterScreen />
//         </NavigationContainer>
//       )
//       .getInstance();
//     tree.handleRegisterPress();
//     await Promise.resolve();
//     expect(navigate).toHaveBeenCalledWith('Login');
//   });

//   test('displays an error message when passwords do not match', async () => {
//     const tree = renderer
//       .create(
//         <NavigationContainer>
//           <RegisterScreen />
//         </NavigationContainer>
//       )
//       .getInstance();
//     tree.setState({
//       username: 'test',
//       password: 'password',
//       confirmPassword: 'password1',
//     });
//     tree.handleRegisterPress();
//     expect(tree.state.error).toEqual('Passwords do not match.');
//   });

//   test('displays an error message when username already exists', async () => {
//     AsyncStorage.getItem.mockResolvedValueOnce(
//       JSON.stringify({ username: 'existingUser' })
//     );
//     const tree = renderer
//       .create(
//         <NavigationContainer>
//           <RegisterScreen />
//         </NavigationContainer>
//       )
//       .getInstance();
//     tree.setState({
//       username: 'existingUser',
//       password: 'password',
//       confirmPassword: 'password',
//     });
//     tree.handleRegisterPress();
//     expect(tree.state.error).toEqual('Username already exists. Please choose a different one.');
//   });

//   test('displays an error message when AsyncStorage throws an error', async () => {
//     AsyncStorage.getItem.mockRejectedValueOnce('AsyncStorage error');
//     const tree = renderer
//       .create(
//         <NavigationContainer>
//           <RegisterScreen />
//         </NavigationContainer>
//       )
//       .getInstance();
//     tree.setState({
//       username: 'test',
//       password: 'password',
//       confirmPassword: 'password',
//     });
//     tree.handleRegisterPress();
//     expect(tree.state.error).toEqual('An error occurred while registering. Please try again.');
//   });
});
