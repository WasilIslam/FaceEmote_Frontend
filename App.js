import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"
import SingleAnalysis from "./pages/SingleAnalysis"
import Compare from "./pages/Compare"
import Logo from "./components/Logo";
import CompareResult from "./pages/CompareResult";
import CompareBy from "./pages/CompareBy";
import Loading from "./components/Loading";
import MoreSingleAnalysis from "./pages/MoreSingleAnalysis";

function App({ navigation }) {
  useEffect(() => {
    async function init() {
      try {
        const { data } = await axios.get("http://localhost:5000/")// for testing if the server is connected
      } catch (err) {
        Alert.alert("No Internet", "Please Check the internet connection!")
      }
    }
    init()
  }, [])

  const AnalyzeSingleImage = async (image) => {
    navigation.navigate("Single", { image })
  }


  const CompareImages=async(image)=>{
    navigation.navigate("Compare")
  }


  const imageSelect = async () => {
    try {
      const response = await launchImageLibrary({ includeBase64: true,selectionLimit:0 })
      if (response.assets[0].uri) {
        await AnalyzeSingleImage(response.assets[0])
      }
    }
    catch (err) {
      console.log(err)
    }
  }



  return <View style={styles.main}>
    <Logo />
    <View style={styles.options}>
      {
        <View>
          <TouchableOpacity style={styles.pickButton} onPress={imageSelect}>
            <Text style={styles.pickButton_text}>Deep Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pickButton, { backgroundColor: "orangered", marginTop: 30 }]} onPress={CompareImages}>
            <Text style={styles.pickButton_text}>Rank <Text style={{fontSize:13}}>(by expressions)</Text></Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  </View>
}






const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  options: {
    marginTop: 140,
    padding: 20,
    alignItems: "center"
  },
  pickButton: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center"
  },
  pickButton_text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Comfortaa-Bold"
  }
})




const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Single" component={SingleAnalysis} />{/*single page analysis*/}
        <Stack.Screen name="MoreSingle" component={MoreSingleAnalysis} />{/*single page analysis more*/}
        <Stack.Screen name="Compare" component={Compare} />{/*group analysis*/}
        <Stack.Screen name="CompareBy" component={CompareBy} />{/*group analysis*/}
        <Stack.Screen name="CompareResult" component={CompareResult} />{/*group analysis result*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}






export default AppStack