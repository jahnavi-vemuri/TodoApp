import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SET_TODOS = 'SET_TODOS';
export const TOGGLE_IMPT = 'TOGGLE_IMP';
export const MARK_COMPLETE = 'MARK_COMPLETE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;
    case ADD_TODO:
      return [...state, action.payload];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case TOGGLE_IMPT:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isImportant: !todo.isImportant } : todo
      );
    case MARK_COMPLETE:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          const { username } = JSON.parse(userData);
          setLoggedInUser(username);
          const storedTodos = await AsyncStorage.getItem(`todos_${username}`);
          if (storedTodos !== null) {
            dispatch({ type: SET_TODOS, payload: JSON.parse(storedTodos) });
          }
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        if (loggedInUser) {
          await AsyncStorage.setItem(`todos_${loggedInUser}`, JSON.stringify(todos));
        }
      } catch (error) {
        console.error('Error saving todos to AsyncStorage:', error);
      }
    };
    saveTodos();
  }, [todos, loggedInUser]);

  const loginUser = (username) => {
    setLoggedInUser(username);
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, dispatch, loggedInUser, loginUser, logoutUser }}>
      {children}
    </TodoContext.Provider>
  );
};