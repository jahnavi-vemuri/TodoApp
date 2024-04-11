import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/to-do-list.png")}
				style={styles.image}
			/>
			<View
				style={styles.textView}
			>
				<Text style={styles.text}>No tasks present</Text>
			</View>
		</View>
	);
};

export default Fallback;

const styles = StyleSheet.create({
	container:{
		alignItems: "center"
	},
	image:{
		height: 300, 
		width: 300
	},
	textView:{
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginTop: 20,
	},
	text:{
		color: "#1e90ff", 
		fontWeight:"700", 
		fontSize: 20
	}
});