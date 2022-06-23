import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
export default function CompareBy({ navigation, route }) {
    const handleNext = () => {
        navigation.navigate("CompareResult", { images: route.params.images, emotion: selectedEmotion })
    }
    const emotions = ["happy", "sad", "neutral", "angry", "fear"]
    const [selectedEmotion, setSelectedEmotion] = useState("happy")
    return <View style={styles.main}>
        <View>
            <Logo />
        </View>
        <View style={styles.emotionContainer}>
            <Text style={styles.header}> Select Emotion</Text>
            {
                emotions.map(emotion => <TouchableOpacity key={emotion} style={selectedEmotion == emotion ? [styles.selected, styles.emotion] : styles.emotion} onPress={() => setSelectedEmotion(emotion)}><Text style={styles.emotionTxt}>{emotion}</Text></TouchableOpacity>)
            }
        </View>
        <View>
            <TouchableOpacity onPress={handleNext} style={styles.next}>
                <Text style={[{ fontFamily: "Comfortaa-Bold", color: "white", fontSize: 30 }]}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "snow"
    },
    emotion: {
        padding: 10,
        marginHorizontal: 10
    },
    selected: {
        borderWidth: 2,
        borderColor: "green",
        backgroundColor: "snow",
    },
    emotionTxt: {
        fontFamily: "Comfortaa-Medium",
        fontSize: 18,
        color: "black",
    },
    header: {
        fontFamily: "Comfortaa-Bold", fontSize: 22,
        marginTop: 5,
        color: "darkcyan",
        paddingVertical:30,
    },
    next: {
        borderColor: "purple",
        flexDirection: "row",
        backgroundColor: "purple",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80
    }
})