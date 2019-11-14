import { Box, Select } from "grommet"

import React from "react"
import { useStore } from "../store"

export default function SelectBox({ options, type, placeholder }) {
  const { widget, dispatch, fetchDataSet } = useStore()
  return (
    <Box width={{ max: "small" }} margin="xsmall">
      <Select
        name="selectbox"
        placeholder={placeholder}
        options={options}
        value={widget[type]}
        onChange={({ option }) => {
          dispatch({
            type: "SELECT_OPTION",
            option: { key: type, value: option }
          })
          if (type === "year") {
            return fetchDataSet(option)
          }
        }}
      />
    </Box>
  )
}
