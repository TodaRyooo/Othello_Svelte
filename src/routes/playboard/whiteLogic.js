//TODO: 白の時の反転操作のみ
const toggleWhiteColor = (index, data) => {
  data[index].isBlank = false
  data[index].isPink = !data[index].isPink

  let arr = []
  let tmp = index

  do {
    if ((tmp - 1) % 4 === 3 || tmp - 1 === -1) break
    tmp--
    if (!data[tmp].isPink || tmp % 4 === 0 || data[tmp].isBlank) break
    else arr.push(tmp)
  } while (tmp % 4 < 3)

  arr.map((item) => (data[item] = { ...data[item], isPink: false }))
}

export default toggleWhiteColor
