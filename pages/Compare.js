import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import Logo from "../components/Logo";
import {createStackNavigator} from "@react-navigation/stack"

const screenWidth = Dimensions.get("screen").width


function Compare({navigation}) {
    const [images, setImages] = useState([])

    const handleNext = () => {
        console.log("Navigating to next screen")
        navigation.navigate("CompareBy",{images})
    }

    const handleAdd = async () => {
        try {
            const { assets } = await launchImageLibrary({ includeBase64: true, selectionLimit: 0 })
            setImages([...images, ...assets])
        }
        catch (err) {
            console.log(err)
        }
    }

    return <View style={styles.main}>
        <Logo />
        <ScrollView>
            <View style={styles.imagesView}>
                {
                    images.map(({ uri }, index) => <Image key={uri + index} style={styles.imageBox} source={{ uri }}></Image>)
                }
                <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                    <Text style={{ color: "black", fontSize: 50, color: "purple" }}>+</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <View>
            {
                images.length != 0 ?
                    <View>
                        <TouchableOpacity onPress={handleNext} style={styles.next}>
                            <Text style={[{ fontFamily: "Comfortaa-Bold", color: "white", fontSize: 30 }]}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    : <View></View>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        flex: 1
    },
    heading: {
    },
    heading_text: {
        fontSize: 25,
        fontFamily: "Comfortaa-Regular",
        color: "black"
    },
    imagesView: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    imageBox: {
        height: 100,
        width: (screenWidth / 4),
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "purple",
        margin: 4,
    },
    addButton: {
        height: 100,
        width: screenWidth / 4,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "purple",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: 4,
    },
    next: {
        borderColor: "purple",
        flexDirection: "row",
        backgroundColor: "purple",
        borderWidth: 2,
        alignItems: "center",
        marginTop: 40,
        justifyContent: "center"
    }
})



export default Compare