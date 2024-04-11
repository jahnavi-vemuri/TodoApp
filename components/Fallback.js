import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
	return (
		<View style={{ alignItems: "center" }}>
			<Image
				source={require("../../TodoApp/assets/to-do-list.png")}
				style={{ height: 300, width: 300 }}
			/>
			<View
				style={{
					paddingVertical: 12,
					paddingHorizontal: 12,
					borderRadius: 6,
					marginTop: 20,
				}}
			>
				<Text style={{ color: "#1e90ff", fontWeight:"700", fontSize: 20}}>Start Adding Your Task</Text>
			</View>
		</View>
	);
};

export default Fallback;

const styles = StyleSheet.create({});