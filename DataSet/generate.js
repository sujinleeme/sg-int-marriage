const fs = require('fs');
const data = require('./marriage.json')

const years = [1980, 1990, 2000, 2010]

function makeFile(year) {
  let categoryNum = 0
  const generatedDataSet = data.reduce((pre, current, index) => {
    const item = data[index]
    const count = Math.round(item[`${year}_num`] * 0.01)
    const createdObj = [...Array(count)].map((_, i) => {
      categoryNum += 1
      return { id: categoryNum, bride: item.bride, groom: item.groom }
    })
  return [...createdObj, ...pre]
  }, [])
  console.log(`make ${year}.json`)
  fs.writeFileSync(`output/${year}s.json`, JSON.stringify(generatedDataSet));
}

years.forEach(year => makeFile(year));





