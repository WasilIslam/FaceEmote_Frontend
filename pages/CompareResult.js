//shows the result for the images got in the Compare

import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { Image, Text, View, ScrollView, StyleSheet, Alert } from "react-native"
import {Sorting } from "../components/Loading"
export default function CompareResult({ navigation, route }) {
    const { images, emotion: currentEmotion } = route.params
    const [emotions, setEmotions] = useState(null)
    useEffect(() => {
        async function init() {
            try {
                const imagesBase64 = images.map(image => image.base64)
                let { data } = await axios.post("http://localhost:5000/mostEmotion", { images: imagesBase64 })
                let newData = data.filter(emotion => !emotion.hasOwnProperty("error"))
                setEmotions(newData.map((emotion, index) => {
                    return { ...emotion, index }
                }))
                if (newData.length < data.length) { 
                    Alert.alert("Alert","Some images not added because face wasnt found!")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        init()
    }, [])

    const sortedEmotions = () => {
        //sorts images according to current emotion
        return (emotions.sort((a, b) => a[currentEmotion] < b[currentEmotion]))
    }
    const getBgByIndex = index => {
        //gets color according to rank
        if (index < 3) {
            return ["darkgoldenrod", "royalblue", "green"][index]
        }
        return "darkgrey"
    }
    return <View style={styles.main}>
        <View style={{ backgroundColor: "whitesmoke", padding: 5, alignItems: "center" }}>
            <Text style={{ fontFamily: "Comfortaa-Bold", fontSize: 30, color: "black" }}>{currentEmotion} rankings🎖️</Text>
        </View>

        {
            emotions != null ?
            <ScrollView>
                <View style={styles.imagesContainer}>
                    {
                        sortedEmotions().map(({ index }, i) => (
                            <View key={"image" + i} style={[styles.imageBox, { borderColor: getBgByIndex(i) }]}>
                                <Image source={{ uri: images[index].uri }} style={styles.image} />
                                <Text style={[styles.ranking, { backgroundColor: getBgByIndex(i) }]}>{i + 1}</Text>
                            </View>
                        )
                        )
                    }
                </View>
            </ScrollView>
            :<Sorting/>
        }
    </View>
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "snow",
        flex: 1
    },

    imagesContainer: {
        alignItems: "center",
    },
    imageBox: {
        borderColor: "darkgrey",
        borderWidth: 1,
        position: "relative",
        marginVertical: 10
    },
    image: {
        width: 260,
        height: 220,
    },
    ranking: {
        position: "absolute",
        right: 0,
        bottom: 0,
        fontFamily: "Comfortaa-Bold",
        color: "black",
        paddingHorizontal: 20,
        paddingVertical: 5,
    }
})