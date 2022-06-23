import React, { useEffect } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../components/Logo"
const screenWidth = Dimensions.get("window").width;



const chartConfig = {
    backgroundGradientFrom: "rgb(255,245,245)",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "rgb(255,245,245)",
    backgroundGradientToOpacity: 1,
    color: (opacity = 0.1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

export default function MoreSingleAnalysis({ navigation, route }) {
    const { result } = route.params

    const race_data = (prop) => ({
        labels: Object.keys(result[prop]),
        datasets: [
            {
                data: Object.values(result[prop])
            }
        ]
    })


    useEffect(() => {
        console.log(result)
    }, [])
    return <View style={styles.main}>
        <View style={styles.header}>
            <Logo />
        </View>
        <View>
            <ScrollView style={{ marginBottom: 20, }}>
                <Text style={styles.heading}>Emotions Chart 🙂</Text>
                <View style={{ borderColor: "purple", borderWidth: 1, marginBottom: 20 }}>
                    <BarChart
                        data={race_data("emotion")}
                        width={screenWidth}
                        height={400}
                        chartConfig={chartConfig}
                        verticalLabelRotation={60}
                    />
                </View>
                <Text style={styles.heading}>Race Chart 👇🏼👇🏾</Text>
                <View style={{ borderColor: "purple", borderWidth: 1, marginBottom: 20 }}>
                    <BarChart
                        data={race_data("race")}
                        width={screenWidth}
                        height={400}
                        chartConfig={chartConfig}
                        verticalLabelRotation={10}
                    />
                </View>
            </ScrollView>
        </View>
    </View>
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white"
    },
    header:{
        paddingVertical:10,
        backgroundColor:"snow"
    },
    heading: {
        color: "purple",
        fontFamily: "Comfortaa-Bold",
        fontSize: 20,
        marginVertical: 20,
    }
})