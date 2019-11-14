const Header = ({ content }) => {
  const { title, description } = content
  return (
    <Box align="center">
      <MapSvgImg />
      <CoupleRingImg />
      <LineHr style={{ marginTop: "-25px" }} />
      <Heading size="medium" textAlign="center">
        {parse(title)}
      </Heading>
      <Paragraph
        margin={{
          top: "0",
          bottom: "24px",
          left: "24px",
          right: "24px"
        }}
        size="large"
      >
        {description}
      </Paragraph>
      <LineHr />
    </Box>
  )
}
