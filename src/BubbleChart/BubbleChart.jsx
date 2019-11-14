import { Box, Text } from "grommet"
import React, { useEffect } from "react"

import Legend from "./Legend"
import SelectBox from "./SelectBox"
import color from "../utils/color"
import d3 from "../utils/d3"
import { numberWithCommas } from "../utils/format"
import { useStore } from "../store"

function BubbleChart() {
  const { data, screen, widget, statistics } = useStore()
  const { height, width } = screen

  const years = ["1980s", "1990s", "2000s", "2010s"]
  const { year, bride, groom, menus } = widget

  let yearNum
  let yearRatio
  if (bride && groom) {
    const selectedCircles = statistics.filter(
      item => item.bride === bride && item.groom === groom
    )
    const currentInfo = selectedCircles[0]
    const yearStr = year.match(/\d+/g)[0]
    if (currentInfo) {
      yearNum = currentInfo[`${yearStr}_num`]
      yearRatio = currentInfo[`${yearStr}_ratio`]
    }
  }

  const bubbleSize = 3.5

  useEffect(() => {
    const nodes = d3.selectAll(".node")
    const nodeGroup = d3.selectAll(".nodeGroup")

    const nodeNum = nodes._groups[0].length
    let simulation

    function ticked() {
      nodeGroup.data(data).attrs(d => {
        return {
          transform: `translate(${d.x}, ${d.y})`
        }
      })
    }

    if (nodeNum > 0) {
      simulation = d3
        .forceSimulation(data)
        .force("gravity", d3.forceManyBody())
        .force("x", d3.forceX().strength(0.7))
        .force("y", d3.forceY().strength(0.7))
        .on("tick", ticked)

      simulation.alphaTarget(0.3).restart()
    }
  }, [data])

  return (
    <>
      <Box
        width="large"
        direction={width <= 768 ? "column" : "row"}
        align="center"
        alignContent="center"
        alignSelf="center"
        justify="center"
      >
        <Box
          alignSelf="center"
          justify="center"
          align="center"
          alignContent="center"
          margin="xsmall"
        >
          <Text margin="small">Year</Text>
          <SelectBox
            type="year"
            margin="small"
            options={years && years}
            placeholder="Select Years"
          />
        </Box>
        <Box
          alignSelf="center"
          justify="center"
          align="center"
          alignContent="center"
          margin="xsmall"
        >
          <Text margin="small">Bride</Text>
          <SelectBox
            type="bride"
            margin="small"
            options={menus && menus.bride}
            placeholder="Select Bride"
          />
        </Box>
        <Box
          alignSelf="center"
          justify="center"
          align="center"
          alignContent="center"
          margin="xsmall"
        >
          <Text margin="small">Groom</Text>
          <SelectBox
            type="groom"
            options={menus && menus.groom}
            placeholder="Select Groom"
          />
        </Box>
      </Box>
      <Box
        margin="large"
        width="large"
        align="center"
        alignContent="center"
        alignSelf="center"
        justify="center"
      >
        <svg width="36" height="36">
          <circle
            cx="18"
            cy="18"
            r="18"
            fill={bride ? color[bride] : color.grey}
          />
          <path
            d="M0,18 a1,1 0 0,0 36,0"
            fill={groom ? color[groom] : color.grey}
          />
        </svg>
        <Text margin="medium">1 circle = About 100 pairs</Text>
        {bride && groom ? (
          <p className="widget-result">
            The total number of marriages between{" "}
            <mark style={{ background: color[bride] }}>{bride}</mark> brides and{" "}
            <mark style={{ background: color[groom] }}>{groom}</mark> grooms in
            the {year} was{" "}
            <strong>
              {numberWithCommas(yearNum)} ({yearRatio}%).
            </strong>
          </p>
        ) : (
          <p className="widget-result">Select bride and groom group.</p>
        )}
      </Box>

      <Box
        width="large"
        align="center"
        alignContent="center"
        alignSelf="center"
        justify="center"
        margin={{ bottom: "large" }}
      >
        <svg
          id="bubble-chart"
          width={width}
          height={height}
          style={{ marginTop: `-${height / 2.8}px` }}
        >
          <g
            style={{ transform: `translate(${width / 2}px, ${height / 2}px)` }}
          >
            {data &&
              data.map((item, i) => (
                <g
                  key={`node-item-${i}`}
                  width={bubbleSize}
                  height={bubbleSize}
                  className="nodeGroup"
                >
                  <circle
                    className="node"
                    cx={bubbleSize}
                    cy={bubbleSize}
                    fill={
                      item.bride === bride && item.groom === groom
                        ? color[bride]
                        : color.grey
                    }
                    r={bubbleSize}
                  />
                  <path
                    className="nodePath"
                    d={`M0, ${bubbleSize} a1, 1 0 0, 0 ${bubbleSize * 2}, 0`}
                    fill={
                      item.bride === bride && item.groom === groom
                        ? color[groom]
                        : color.grey
                    }
                  />
                </g>
              ))}
          </g>
        </svg>
        <Box margin={{ top: `-${height / 4}px` }}>
          <Legend />
        </Box>
      </Box>
    </>
  )
}

export default BubbleChart
