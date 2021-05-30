'use strict'


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} input
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(input) {
  const arr = input.split('')
  const length = arr.length
  const c = new Array(length).fill(0)
  let i = 1, k

  yield input

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];

      [arr[i], arr[k]] = [arr[k], arr[i]]

      ++c[i]
      i = 1
      yield arr.join('')
    } else {
      c[i] = 0
      ++i
    }
  }

  return input
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 *
 * @param {number[]} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  const reverse = quotes.reverse()
  let profit = 0
  let min = 0

  for (const quote of reverse) {
    if (min <= quote) {
      min = quote
    }

    profit += min - quote
  }

  return profit
}


module.exports = {
  getPermutations: getPermutations,
  getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
}
