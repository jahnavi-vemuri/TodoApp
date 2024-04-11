import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SET_TODOS = 'SET_TODOS';
export const TOGGLE_IMPT = 'TOGGLE_IMP';

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
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos !== null) {
          dispatch({ type: SET_TODOS, payload: JSON.parse(storedTodos) });
        }
      } catch (error) {
        console.error('Error loading todos from AsyncStorage:', error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to AsyncStorage:', error);
      }
    };

    saveTodos();
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};