import type { boardData } from '@/types/type'

const findReversibleTiles = (
  grid: boardData[][],
  col: number,
  row: number,
  colStep: number,
  rowStep: number,
  isWhiteTurn: boolean
) => {
  const arr = []
  let found = false

  const size = grid.length

  for (
    let [colIndex, rowIndex] = [col + colStep, row + rowStep];
    colIndex >= 0 && colIndex < size && rowIndex >= 0 && rowIndex < size;
    colIndex += colStep, rowIndex += rowStep
  ) {
    if (grid[colIndex][rowIndex].isBlank) break // 空のマスがあれば終了

    if (isWhiteTurn ? grid[colIndex][rowIndex].isWhite : !grid[colIndex][rowIndex].isWhite) {
      found = true
      break
    }
    arr.push({ arrCol: colIndex, arrRow: rowIndex }) // 反転できるマスを記録
  }

  // 反転処理
  if (found) {
    arr.forEach(({ arrCol, arrRow: arrRow }) => {
      grid[arrCol][arrRow].isWhite = !grid[arrCol][arrRow].isWhite // マスを反転
    })
  }
}

export default findReversibleTiles
