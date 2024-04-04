import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyDataComponent = ({ text, subtext }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.subtext}>{subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
  },
});

export default EmptyDataComponent;
