import { Box, Grommet, Heading, Paragraph, Text } from "grommet"
import {
  HeartIcon,
  HeartlineImg,
  LineChartImg,
  MapSvgImg
} from "./Svg"
import React, { useEffect, useReducer } from "react"
import { initialState, reducer } from "./reducer.js"
import {
  useFetchDataSet,
  useFethContent,
  useScreenState,
  useScrollyDataSet
} from "./utils/hooks"

import Animations from "./Animations"
import BubbleChart from "./BubbleChart"
import Loading from "./Loading"
import Scrolly from "./Scrolly"
import { StateContext } from "./store"
import customTheme from "./customTheme"
import headerContent from "./headerContent"
import parse from "html-react-parser"
import styled from "styled-components"

const MapBox = styled.div`
  width: 80%;
`

const HeadingContainer = styled.div`
  max-width: 590px;
`

const Container = ({ children }) => (
  <Box align="center">
    <Box width="large">{children}</Box>
  </Box>
)

const Header = ({ content }) => {
  const { title, description, byline } = content
  return (
    <Box align="center" size="medium" margin="large">
      <MapBox>
        <MapSvgImg />
      </MapBox>

      <HeadingContainer>
        <Heading level={1} textAlign="center">
          {parse(title)}
        </Heading>
        <Paragraph size="large">{description}</Paragraph>
        <Box
          direction="column"
          alignContent="start"
          alignSelf="start"
          justify="start"
          size="large"
          margin={{
            top: "large",
            bottom: "medium"
          }}
        >
          <Box direction="row" margin={{ bottom: "xsmall" }}>
            <Text margin={{ right: "small" }}>Published:</Text>
            <Text>Nov. 11. 2019.</Text>
          </Box>
          <div>
            <Text margin={{ right: "small" }}> By:</Text>
            {byline.map(person => (
              <Text margin={{ right: "small" }} key={person.name}>
                <a href={person.linkedin}>{person.name}</a>
              </Text>
            ))}
          </div>
        </Box>
      </HeadingContainer>
    </Box>
  )
}


const ParagraphContainer = ({ content, isMobile }) => {
  return content.map((item, i) => (
    <Box key={i}>
      {item.id === 25 && item.tag === "h2" && (
        <Box
          margin={{
            top: "60px",
            bottom: "30px"
          }}
        >
          <HeartlineImg />
          <Heading
            level={2}
            margin={{
              top: "60px",
              bottom: "0px"
            }}
            textAlign="center"
          >
            {item.body}
          </Heading>
        </Box>
      )}

      {item.id !== 25 && item.tag === "h2" && (
        <Box
          alignSelf="start"
          justify="center"
          align="center"
          direction="row"
          margin="medium"
        >
          <HeartIcon style={{ marginRight: "10px", height: "28px" }} />
          <Heading level={3}>{item.body}</Heading>
        </Box>
      )}
      {item.tag === "p" && (
        <Paragraph
          size="large"
          margin={{
            top: "0",
            bottom: "medium",
            left: "medium",
            right: "medium"
          }}
        >
          {parse(item.body)}
        </Paragraph>
      )}
      {item.tag === "span" && (
        <Text
          size="medium"
          margin={{
            top: "0",
            bottom: "24px",
            left: "24px",
            right: "24px"
          }}
        >
          {parse(item.body)}
        </Text>
      )}
      {item.id === 2 && (
        <Box
          size="large"
          margin={{
            top: "xlarge",
            bottom: "xlarge"
          }}
          width="100%"
          height="100%"
        >
          <Animations width="50%" filename="Love" />
        </Box>
      )}
      {item.id === 5 && (
        <Box
          margin={{
            top: "40px",
            bottom: "40px"
          }}
        >
          <Heading margin="medium" textAlign="center" level={4}>
            Median Age of First Marriage: Then & Now
          </Heading>
          <Box
            align="center"
            alignContent="center"
            alignSelf="center"
            justify="center"
            width="100%"
            margin="medium"
          >
            <Animations
              width={isMobile ? "50%" : "75%"}
              filename={isMobile ? "AgeChartMobile" : "AgeChartDesktop"}
            />
          </Box>
        </Box>
      )}
      {item.id === 7 && (
        <Box
          align="center"
          alignContent="center"
          alignSelf="center"
          justify="center"
          margin={{
            bottom: "large"
          }}
          width="100%"
          height="100%"
        >
          <Heading textAlign="center" margin="medium" level={4}>
            Total Marriages & Inter-ethnic Marriages from 1980 to 2018
          </Heading>
          <Box
            align="center"
            alignContent="center"
            alignSelf="center"
            justify="center"
            width={isMobile ? "100%" : "80%"}
            margin={{
              top: "medium"
            }}
          >
            <LineChartImg />
          </Box>
        </Box>
      )}
    </Box>
  ))
}

function App() {
  // init state
  const { content, statistics, contentLoading } = useFethContent()

  const [{ widget }, dispatch] = useReducer(reducer, initialState)

  const { data, dataLoading, scrollyData, fetchDataSet } = useFetchDataSet()
  const { scrollyDataSet, scrollyDataSetLoading } = useScrollyDataSet()

  useEffect(() => {
    fetchDataSet(widget.year)
  }, [])

  const { screen } = useScreenState()

  const sectionOne = content.filter(x => x.type === "section-1")
  const sectionTwo = content.filter(x => x.type === "section-2")
  const sectionThree = content.filter(x => x.type === "section-3")

  const scrolly = content.filter(x => x.type === "scrolly")

  return (
    <StateContext.Provider
      value={{
        statistics,
        screen,
        widget,
        dispatch,
        data,
        scrollyData,
        fetchDataSet
      }}
    >
      <Grommet theme={customTheme}>
        <Container>
          <Header content={headerContent} />
        </Container>
        {contentLoading || scrollyDataSetLoading ? (
          <Loading />
        ) : (
          <>
            <Container>
              {sectionOne && (
                <ParagraphContainer
                  isMobile={screen.width <= 425}
                  content={sectionOne}
                />
              )}
            </Container>
            <Box
              size="xlarge"
              margin={{
                top: "large"
              }}
            >
              {scrollyDataSet && scrolly.length > 0 && (
                <Scrolly
                  screen={screen}
                  scrollyData={scrollyDataSet}
                  content={scrolly}
                />
              )}
            </Box>
            <Container>
              {sectionTwo && (
                <ParagraphContainer
                  isMobile={screen.width <= 425}
                  content={sectionTwo}
                />
              )}
            </Container>
            <Box
              margin={{
                top: "small"
              }}
            >
              {screen && data && <BubbleChart background={{ color: "#eee" }} />}
            </Box>
            <Container>
              {sectionThree && <ParagraphContainer content={sectionThree} />}
            </Container>
          </>
        )}
      </Grommet>
    </StateContext.Provider>
  )
}

export default App
