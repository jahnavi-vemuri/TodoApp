import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { IconButton } from 'react-native-paper';
import moment from 'moment';

const TaskItem = ({ item, onDelete, onEdit, onToggleImportant }) => {
    const formattedDate = item.date ? moment(item.date).format('DD/MM/YYYY') : '';
    const formattedTime = item.time ? moment(item.time, 'HH:mm').format('hh:mm A') : '';
    return (
      <View
        style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>
            {item.title}
          </Text>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={styles.datetimeText}>
              {formattedDate}
            </Text>
            <Text style={styles.datetimeText}>
              {formattedTime}
            </Text>
          </View>
        </View>
        <IconButton
          icon={item.isImportant ? 'heart' : 'heart-outline'}
          color="#fff"
          onPress={() => onToggleImportant(item.id)}
        />
        <IconButton
          icon="pencil"
          color="#fff"
          onPress={() => onEdit(item)}
        />
        <IconButton
          icon="trash-can"
          color="#fff"
          onPress={() => onDelete(item.id)}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
      backgroundColor: '#1e90ff',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 12,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    },
    titleText:{
      color: '#fff', 
      fontSize: 20, 
      fontWeight: '800'
    },
    datetimeText:{
      color: '#fff', 
      fontSize: 10, 
      fontWeight: '800'
    }
  })

export default TaskItem;