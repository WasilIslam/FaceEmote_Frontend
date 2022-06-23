import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function Logo() {
    return <View style={styles.heading_container}>
        <Text style={styles.heading}>Face<Text style={styles.heading_sis}>Emot</Text></Text>
    </View>
}

const styles = StyleSheet.create({
    heading_container: {
        alignItems: "center",
    },
    heading: {
        fontFamily: "Comfortaa-Bold",
        fontSize: 20,
        color: "black",
    },
    heading_sis: {
        color: "orangered"
    },
})