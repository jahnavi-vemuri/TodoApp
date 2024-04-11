import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTodoContext, ADD_TODO, EDIT_TODO } from '../context/TodoContext';
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const AddTodoScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState('');
  const { dispatch } = useTodoContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const editTodo = route.params ? route.params.todo : null;
  useEffect(() => {
    if (editTodo) {
      setTodo(editTodo.title);
      setSelectedDate(editTodo.date);
      setSelectedTime(editTodo.time);
    }
  }, [editTodo]);

  const handleSaveTodo = () => {
    if (!todo.trim()) {
      alert('Please enter a todo title.');
      return;
    }
    const newTodo = {
      id: editTodo ? editTodo.id : Date.now(),
      title: todo,
      date: selectedDate,
      time: selectedTime
    };

    if (editTodo) {
      dispatch({ type: EDIT_TODO, payload: newTodo });
    } else {
      dispatch({ type: ADD_TODO, payload: newTodo });
    }

    navigation.goBack();
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY');
  };

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm').format('hh:mm A');
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Todo"
        value={todo}
        onChangeText={setTodo}
      />
      <View style={styles.datetimeContainer}>
        <TextInput
          style={styles.datetime}
          placeholder="Set date (optional)"
          editable={false}
          value={selectedDate ? formatDate(selectedDate) : ''}
        />
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Icon name="calendar-outline" size={40} color="#1e90ff" />
        </TouchableOpacity>
      </View>
      <View style={styles.datetimeContainer}>
        <TextInput
          style={styles.datetime}
          placeholder="Set time (optional)"
          editable={false}
          value={selectedTime ? formatTime(selectedTime) : ''}
        />
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Icon name="time-outline" size={40} color="#1e90ff" />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showCalendar}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowCalendar(false)}
      />
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSaveTodo()}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {editTodo ? 'Save' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    margin: 16
  },
  input: {
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 16,
    padding: 16, 
    marginBottom: 10
  },
  datetimeContainer:{
    flexDirection: "row",
    alignItems: "center"
  },
  datetime:{
    flex:1,
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 16,
    padding: 16, 
    marginBottom: 10
  },
  button:{
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
})

export default AddTodoScreen;
