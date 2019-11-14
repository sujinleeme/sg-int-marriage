import { Box, Text } from "grommet"

import React from "react"
import color from "../utils/color"

function Legend() {
  const list = ["Caucasian", "Chinese", "Eurasian", "Indian", "Malay", "Other"]

  return (
    <Box
      width="135px"
      alignContent="center"
      alignSelf="center"
      justify="center"
    >
      {list.map((item, i) => (
        <Box key={`legend-${item}`} direction="row" margin="xsmall">
          <svg width="22px" height="22px">
            <circle cx="12" cy="12" r="6" fill={color[item]} />
          </svg>
          <Text
            margin={{
              left: "small",
              top: "0"
            }}
          >
            {item}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

export default Legend
