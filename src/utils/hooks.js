import { useEffect, useState } from "react"

export const useScreenState = () => {
  const [screen, setScreen] = useState([])

  function reportWindowSize() {
    let w = window.innerWidth
    let h = window.innerHeight

    if (window.devicePixelRatio < 1) {
      w = window.screen.width / window.devicePixelRatio
      h = window.screen.height / window.devicePixelRatio
    }

    const screen = {
      height: h,
      width: w
    }
    setScreen(screen)
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

  useEffect(() => {
    reportWindowSize()
    if (!isMobile) {
      window.addEventListener("resize", reportWindowSize)
      return () => {
        window.removeEventListener("resize", reportWindowSize)
      }
    }
  }, [])
  return { screen }
}

export const useFethContent = () => {
  const [content, setContent] = useState([])
  const [statistics, setStatistics] = useState([])
  const [contentLoading, setContentLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setContentLoading(true)
        setError(null)
        const content = await fetch("data/content.json")
        const contentJson = await content.json()
        const statistics = await fetch("data/marriage.json")
        const statisticsJson = await statistics.json()

        contentJson ? setContent(contentJson) : setContent([])
        statisticsJson ? setStatistics(statisticsJson) : setStatistics([])
        setContentLoading(false)
      } catch (err) {
        setError(err)
        setContentLoading(false)
      }
    }
    fetchData()
  }, [])
  return { content, contentLoading, statistics, error }
}

export const useScrollyDataSet = () => {
  const [scrollyDataSet, setScrollyDataSet] = useState([])
  const [scrollyDataSetLoading, setScrollyDataLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchDataSet() {
    try {
      setScrollyDataLoading(true)
      setError(null)
      const scrollyDataResponse = await fetch("data/scrollyData.json")
      const scrollyDataJson = await scrollyDataResponse.json()

      scrollyDataJson
        ? setScrollyDataSet(scrollyDataJson)
        : setScrollyDataSet([])

      setScrollyDataLoading(false)
    } catch (err) {
      setError(err)
      setScrollyDataLoading(false)
    }
  }

  useEffect(() => {
    fetchDataSet()
  }, [])
  return { scrollyDataSet, scrollyDataSetLoading }
}

export const useFetchDataSet = dataSetName => {
  const [data, setData] = useState([])

  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchDataSet(dataSetName) {
    try {
      setDataLoading(true)
      setError(null)
      const response = await fetch(`data/${dataSetName}.json`)
      const dataJson = await response.json()
      dataJson ? setData(dataJson) : setData([])
      setDataLoading(false)
    } catch (err) {
      setError(err)
      setDataLoading(false)
    }
  }
  return { data, dataLoading, error, fetchDataSet }
}
