import LottieView from "lottie-react-native"
import React from "react"

function Analyzing() {
    return <LottieView source={require("../assets/lottie/face.json")} autoPlay loop />
}

function Sorting() {
    return <LottieView source={require("../assets/lottie/sorting.json")} autoPlay loop />
}
export { Analyzing, Sorting }