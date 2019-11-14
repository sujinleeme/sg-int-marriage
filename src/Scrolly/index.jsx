import "@st-graphics/react-scrolly/dist/bundle.css"
import "./Scrolly.scss"

import { Box, Paragraph, Text } from "grommet"

import Legend from "../BubbleChart/Legend"
import React from "react"
import ScrollyBubbleChart from "./ScrollyBubbleChart"
import StScrolly from "@st-graphics/react-scrolly"
import color from "../utils/color"
import parse from "html-react-parser"

export default function Scrolly({ content, screen, scrollyData }) {
  const { height } = screen

  const renderBackground = ({ slideIndex }) => (
    <ScrollyBubbleChart
      dataset={scrollyData}
      slideIndex={slideIndex}
      screen={screen}
    />
  )

  const slides = content.map((slide, i) => (
    <div
      key={i}
      className="slide"
      style={{
        height: `${height}px`,
        marginBottom: content.length - 1 === i ? `${height / 2}px` : ""
      }}
    >
      <div className="card">
        <Paragraph size="large" margin="xsmall">
          {parse(slide.body)}
        </Paragraph>
        {slide.id === 9 && (
          <Box
            direction="row"
            alignContent="center"
            alignSelf="center"
            justify="center"
            margin={{
              top: "small",
              bottom: "medium"
            }}
          >
            <svg width="24" height="24">
              <circle cx="12" cy="12" r="6" fill={color.grey} />
            </svg>
            <Text margin={{ left: "12px" }}>1 circle = About 100 pairs</Text>
          </Box>
        )}
        {slide.id === 11 && (
          <Box
            direction="row"
            alignContent="center"
            alignSelf="center"
            justify="center"
            margin="medium"
          >
            <Legend />
          </Box>
        )}
      </div>
    </div>
  ))

  return (
    <StScrolly
      className="slots"
      renderBackground={renderBackground}
      windowHeight={height}
      windowTop={0}
    >
      {slides}
    </StScrolly>
  )
}
