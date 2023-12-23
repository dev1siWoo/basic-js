const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  const isMine = (i, j) => matrix[i] && matrix[i][j];

  const countMines = (i, j) => {
    let count = 0;

    for (let ni = i - 1; ni <= i + 1; ni++) {
      for (let nj = j - 1; nj <= j + 1; nj++) {
        if ((ni !== i || nj !== j) && isMine(ni, nj)) {
          count++;
        }
      }
    }

    return count;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isMine(i, j)) {
        result[i][j] = 1;
      } else {
        result[i][j] = countMines(i, j);
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper,
};
