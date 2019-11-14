import React, { useEffect } from "react"

import color from "../utils/color"
import d3 from "../utils/d3"

function BubbleChart({ slideIndex, dataset, screen }) {
  const { height, width } = screen

  const bubbleSize = 3.5

  useEffect(() => {
    const scrollyNodes = d3.selectAll(".scrollyNodeGroup")

    function ticked() {
      // const currentDataSet = slideIndex < 2 ? dataset : highlightedData
      scrollyNodes.data(dataset).attrs(d => {
        return {
          transform: `translate(${d.x}, ${d.y})`
        }
      })
    }

    const simulate = d3
      .forceSimulation()
      .nodes(dataset)
      .force("gravity", d3.forceManyBody())
      .force("x", d3.forceX().strength(0.8))
      .force("y", d3.forceY().strength(0.8))
      .on("tick", ticked)

    simulate.alphaTarget(0.01)
  }, [])

  const currentGroup = {
    4: "Caucasian",
    5: "Chinese",
    6: "Eurasian",
    7: "Indian",
    8: "Malay",
    9: "Other",
    10: "Chinese"
  }[slideIndex]

  const getColor = (categoryVal, oppositeVal, category) => {
    if (categoryVal === "Non-intl") {
      if (slideIndex < 2) {
        return color.grey
      }
      return "#eee"
    }

    if (slideIndex <= 0) {
      return color.grey
    }
    if (slideIndex === 1) {
      return color.pink
    }
    if (slideIndex === 2) {
      return color[categoryVal]
    }
    if (slideIndex === 3) {
      return {
        groom: color.groom,
        bride: color.bride
      }[category]
    }
    if (slideIndex > 3 && slideIndex <= 9) {
      if (categoryVal === currentGroup) {
        return color[currentGroup]
      }
      return color.grey
    }
    if (slideIndex === 10) {
      if (category === "groom" && categoryVal === "Chinese") {
        return color.Chinese
      }
      if (category === "bride" && oppositeVal === "Chinese") {
        return color[categoryVal]
      }
      return color.grey
    }
    if (slideIndex >= 11) {
      if (
        category === "groom" &&
        categoryVal === "Chinese" &&
        oppositeVal === "Other"
      ) {
        return color.Chinese
      }
      if (
        category === "bride" &&
        oppositeVal === "Chinese" &&
        categoryVal === "Other"
      ) {
        return color.Other
      }
      return color.grey
    }
  }

  return (
    <svg id="scrolly-bubble-chart" width={width} height={height}>
      <g style={{ transform: `translate(${width / 2}px, ${height / 2}px)` }}>
        {dataset &&
          dataset.map((item, i) => (
            <g
              key={`node-${i}`}
              width={bubbleSize}
              height={bubbleSize}
              className="scrollyNodeGroup"
            >
              <circle
                className="scrollyNode"
                cx={bubbleSize}
                cy={bubbleSize}
                fill={getColor(item.bride, item.groom, "bride")}
                r={bubbleSize}
              />
              <path
                className="scrollyNodePath"
                d={`M0, ${bubbleSize} a1, 1 0 0, 0 ${bubbleSize * 2}, 0`}
                fill={getColor(item.groom, item.bride, "groom")}
              />
            </g>
          ))}
      </g>
    </svg>
  )
}

export default BubbleChart
