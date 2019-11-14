import { deepFreeze } from "grommet/utils"

const customTheme = deepFreeze({
  themeMode: "light",
  formField: {
    color: {
      focus: "#ef307e"
    }
  },
  global: {
    colors: {
      brand: "#ef307e",
      control: {
        light: "#ef307e"
      },
      focus: "#ef307e",
      active: "#ef307e"
    },
    select: {
      container: {
        extend: "background: #eee"
      }
    },
    control: {
      color: "FD6FFF"
    }
  },
  paragraph: {
    large: {
      maxWidth: "700px",
      height: "29px",
      size: "18px"
    },
    level: {
      2: {
        font: { family: "Noto Serif" },
        size: "21px"
      },
      1: {
        font: { family: "Noto Serif" }
      }
    }
  },
  heading: {
    font: { family: "Noto Serif", lineHeight: "unset" },
    level: {
      1: {
        font: {
          size: "45px"
        }
      },
      2: {
        size: "21px"
      },
      3: {
        font: { family: "Noto Serif" },
        size: "30px",
        margin: "24px !important"
      },
      4: {
        font: { family: "Noto Sans KR" },
        size: "14px"
      }
    }
  },
  select: {
    container: {
      extend: "background: #eee"
    }
  }
})

export default customTheme
