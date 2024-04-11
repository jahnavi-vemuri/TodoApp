import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { useTodoContext, ADD_TODO, EDIT_TODO } from './TodoContext';
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddTodoScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState('');
  const { dispatch } = useTodoContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

    // Extract todo details if available (when editing)
    const editTodo = route.params ? route.params.todo : null;
    useEffect(() => {
      if (editTodo) {
        setTodo(editTodo.title);
        setSelectedDate(editTodo.date);
        setSelectedTime(editTodo.time);
      }
    }, [editTodo]);
  
    const handleSaveTodo = () => {
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
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${amPM}`;
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
    <View style={{ margin: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginBottom: 10
        }}
        placeholder="Add Todo"
        value={todo}
        onChangeText={setTodo}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: "#1e90ff",
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 10,
          }}
          placeholder="Set date"
          editable={false}
          value={selectedDate ? formatDate(selectedDate) : ''}
        />
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Icon name="calendar-outline" size={30} color="#1e90ff" />
        </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
         <TextInput
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: "#1e90ff",
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 10,
          }}
          placeholder="Set time"
          editable={false}
          value={selectedTime ? formatTime(selectedTime) : ''}
        />
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Icon name="time-outline" size={30} color="#1e90ff" />
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
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
        onPress={() => handleSaveTodo()}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {editTodo ? 'Save' : 'Add'}
          </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;
