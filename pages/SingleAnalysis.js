import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { Analyzing } from "../components/Loading";
import Logo from "../components/Logo";

const screenWidth = Dimensions.get("screen").width




function KeyValueText({ k, v }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Comfortaa-Bold", fontSize: 17, color: "darkcyan" }}>{k}: </Text>
            <Text style={{ fontFamily: "Comfortaa-Light", fontSize: 14, color: "black" }}>{v}</Text>
        </View>
    )
}









function SingleAnalysis({ route, navigation }) {
    const { image } = route.params
    const [result, setResult] = useState(null)//null means loading
    useEffect(() => {
        async function init() {
            try {
                const { data } = await axios.post("http://localhost:5000/analyze", { base64: image.base64 })
                if (data.error) {
                    Alert.alert("Face Not Found!", "Use Image showing clear face, not cropped and stuff!")
                    navigation.goBack(null)
                }
                setResult(data)
                console.log("Result", data)
            }
            catch (err) {
                console.log(err)
            }
        }
        init()
    }, [])
    const handleNext = () => {
        navigation.navigate("MoreSingle", { result })
    }
    return <View style={styles.main}>
        <Logo />
        <View style={styles.imageBox}>
            <Image style={styles.image} source={{ uri: image.uri }}></Image>
        </View>
        {
            result != null ?
                <View style={styles.result}>
                    <Text style={{ fontFamily: "Comfortaa-Bold", color: "firebrick", fontSize: 20, textDecorationLine: "underline" }}>A {result.dominant_race} {result.dominant_emotion} {result.gender}!!</Text>
                    <KeyValueText k={"Emotion"} v={result.dominant_emotion} />
                    <KeyValueText k={"Race"} v={result.dominant_race} />
                    <KeyValueText k={"Gender"} v={result.gender} />
                    <TouchableOpacity onPress={handleNext} style={styles.moreButton}><Text style={styles.moreText}>More Analysis...</Text></TouchableOpacity>
                </View>
                :
                <Analyzing />
        }
    </View>
}
const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        flex: 1,
    },
    imageBox: {
        marginTop: 20,
        alignItems: "center"
    },
    image: {
        borderRadius: 5,
        borderWidth: 2,
        width: screenWidth - 10,
        height: screenWidth - 70,
    },
    result: {
        marginLeft: 45,
        marginTop: 20
    },
    moreButton: {
        borderColor: "purple",
        borderWidth: 2,
        fontFamily: "Comfortaa-Bold",
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 20,
        marginRight: 10
    },
    moreText: {
        fontSize: 15,
        color: "purple"
    }
})

export default SingleAnalysis