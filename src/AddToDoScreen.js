import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";

const AddToDoScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { handleAddTodo,editedTodo } = route.params;
  const isEditing = !!editedTodo;

  useEffect(() => {
    if (editedTodo) {
      setTodo(editedTodo.title);
      setSelectedDate(editedTodo.date);
      setSelectedTime(editedTodo.time);
    }
  }, [editedTodo]);

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

  const handleSave = () => {
    if (!todo.trim()) {
      console.log("Title is required.");
      return;
  }
    const updatedTodo = {
        id: isEditing ? editedTodo.id : Date.now(), 
        title: todo.trim(),
        date: selectedDate,
        time: selectedTime,
    };
    if (isEditing) {
    // handleEditTodo(updatedTodo);
    } else {
      // Add the new todo
      handleAddTodo(updatedTodo);
    }
    // handleAddTodo(updatedTodo);
    navigation.goBack();
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
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginBottom: 10
        }}
        placeholder="Add Task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
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
          marginVertical: 34,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
        onPress={() => handleSave()}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {isEditing ? "Save" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToDoScreen;
