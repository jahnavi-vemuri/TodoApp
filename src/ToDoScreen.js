import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";


const TodoScreen = ({ navigation }) => {
    // Init local states
    const [todoList, setTodoList] = useState([]);

    // Handle Add Todo
    const handleAddTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
        // navigation.goBack(); Navigate back to TodoScreen
    };

    // Handle Delete
    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    // Handle Edit todo
    const handleEditTodo = (todo) => {
        // const updatedList = todoList.map(todo => {
        //     if (todo.id === updatedTodo.id) {
        //       return updatedTodo;
        //     }
        //     return todo;
        //   });
        //   setTodoList(updatedList);
        navigation.navigate("AddToDo", { handleAddTodo, editedTodo: todo});
    };
    return (
    <View style={{ flex: 1 }}>
        <FlatList
            data={todoList}
            renderItem={({ item }) => (
                <View
                    style={{
                        backgroundColor: "#1e90ff",
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        paddingVertical: 8,
                        marginBottom: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 3,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>
                                {item.date instanceof Date ? item.date.toDateString() : item.date}
                            </Text>
                            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>
                                {item.time instanceof Date ? item.time.toLocaleTimeString() : item.time}
                            </Text>
                        </View>
                    </View>

                    <IconButton
                        icon="pencil"
                        color="#fff"
                        onPress={() => handleEditTodo(item)}
                    />
                    <IconButton
                        icon="trash-can"
                        color="#fff"
                        onPress={() => handleDeleteTodo(item.id)}
                    />
                </View>
            )}
            ListEmptyComponent={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Fallback />
                </View>
            )}
        />

        <TouchableOpacity
            style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                backgroundColor: "#1e90ff",
                borderRadius: 50,
                padding: 8,
            }}
            onPress={() => navigation.navigate("AddToDo", { handleAddTodo })}
        >
            <IconButton icon="plus" color="#fff" />
        </TouchableOpacity>
    </View>
);

};

const styles = StyleSheet.create({
});

export default TodoScreen;

