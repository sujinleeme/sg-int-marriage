import AgeChartDesktop from "./AgeChartDesktop.json";
import AgeChartMobile from "./AgeChartMobile.json";
import Lottie from "react-lottie"
import Love from "./Love.json"
import React from "react"

function Animation({ filename, width, height }) {
  const animationData = {
    Love,
    AgeChartDesktop,
    AgeChartMobile
  }[filename]

  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
        margin: "0 auto"
      }}
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
        }}
      />
    </div>
  )
}

export default Animation
