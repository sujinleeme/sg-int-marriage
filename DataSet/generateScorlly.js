const fs = require('fs');
const data = require('./marriage.json')

const years = [2010]
const all = Math.round((198278 - 35370) * 0.01)
function makeFile(year) {
  let categoryNum = 0
  const intlMarriage = data.reduce((pre, current, index) => {
    const item = data[index]
    const count = Math.round(item[`${year}_num`] * 0.01)
    const createdObj = [...Array(count)].map((_, i) => {
      categoryNum += 1
      return { id: categoryNum, bride: item.bride, groom: item.groom, intl: false }
    })

    return [...createdObj, ...pre]
  }, [])


  const sameMarriage = [...Array(all)].map((_, i) => {
    categoryNum += 1
    return {
      ...{ id: categoryNum, bride: "Non-intl", groom: "Non-intl", intl: true }
    }
  })
  console.log(`make scrollyData.json`)
  fs.writeFileSync(`output/scrollyData.json`, JSON.stringify([...intlMarriage, ...sameMarriage]));
}

years.forEach(year => makeFile(year));





