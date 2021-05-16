'use strict'

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
  const sides = ['N', 'E', 'S', 'W']  // use array of cardinal directions only!

  const byChar = (str) => str.split('')
  const buildSideName = (chars) => chars.reduce((p, c) => p + (c === 'b' ? c : sides[+c]), '')

  return [
    '0', '0b1', '001', '01b0', '01', '01b1', '101', '1b0',
    '1', '1b2', '121', '21b1', '21', '21b2', '221', '2b1',
    '2', '2b3', '223', '23b2', '23', '23b3', '323', '3b2',
    '3', '3b0', '303', '03b3', '03', '03b0', '003', '0b3',
  ]
    .map(byChar)
    .map(buildSideName)
    .map((sideName, i) => ({ abbreviation: sideName, azimuth: (360.0 / 32) * i }))
}

/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  // diagonals :: n -> [[n]]
  function diagonals(n) {
    let diags = (xs, iCol, iRow) => {
      if (iCol < xs.length) {
        let xxs = splitAt(iCol, xs)

        return [xxs[0]].concat(diags(
          xxs[1],
          iCol + (iRow < n ? 1 : -1),
          iRow + 1,
        ))
      } else return [xs]
    }

    return diags(range(0, n * n - 1), 1, 1)
  }


  // Recursively read off n heads of diagonal lists
  // rowsFromDiagonals :: n -> [[n]] -> [[n]]
  function rowsFromDiagonals(n, lst) {
    if (lst.length) {
      let [edge, rest] = splitAt(n, lst)

      return [edge.map(x => x[0])]
        .concat(rowsFromDiagonals(n,
          edge.filter(x => x.length > 1)
            .map(x => x.slice(1))
            .concat(rest),
        ))
    } else return []
  }

  // GENERIC FUNCTIONS

  // splitAt :: Int -> [a] -> ([a],[a])
  function splitAt(n, xs) {
    return [xs.slice(0, n), xs.slice(n)]
  }

  // range :: From -> To -> Maybe Step -> [Int]
  // range :: Int -> Int -> Maybe Int -> [Int]
  function range(m, n, step) {
    let d = (step || 1) * (n >= m ? 1 : -1)

    return Array.from({
      length: Math.floor((n - m) / d) + 1,
    }, (_, i) => m + (i * d))
  }

  // ZIG-ZAG MATRIX

  return rowsFromDiagonals(n,
    diagonals(n)
      .map((x, i) => (i % 2 || x.reverse()) && x),
  )

}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {Array.<number>} nums
 * @return {string}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
  let last = NaN

  return nums
    .reduce((p, c) => {
      if (Math.abs(c) - last === 1) p[p.length - 1].push(c)
      else p.push([c])

      last = Math.abs(c)

      return p
    }, [])
    .map(g => {
      if (g.length > 2) return `${g[0]}-${g.pop()}`
      return g.join(',')
    })
    .join(',')
}

module.exports = {
  createCompassPoints: createCompassPoints,
  getZigZagMatrix: getZigZagMatrix,
  extractRanges: extractRanges,
}
