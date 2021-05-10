'use strict'

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
  for (let i = 99; i >= 0; i--) {
    if (i === 0) {
      yield `No more bottles of beer on the wall, no more bottles of beer.`
      yield 'Go to the store and buy some more, 99 bottles of beer on the wall.'
    } else if (i === 1) {
      yield `1 bottle of beer on the wall, 1 bottle of beer.`
      yield `Take one down and pass it around, no more bottles of beer on the wall.`
    } else if (i === 2) {
      yield `2 bottles of beer on the wall, 2 bottles of beer.`
      yield `Take one down and pass it around, 1 bottle of beer on the wall.`
    } else {
      yield `${i} bottles of beer on the wall, ${i} bottles of beer.`
      yield `Take one down and pass it around, ${i - 1} bottles of beer on the wall.`
    }
  }
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
  let seq = [0, 1]

  yield seq[0]
  yield seq[1]

  while (true) {
    seq = [seq[1], seq[1] + seq[0]]

    yield seq[1]
  }
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
  let isFinished = false

  yield root

  while (!isFinished) {
    if (root.children) {
      for (const child of root.children) {
        yield* depthTraversalTree(child)
      }
    }

    isFinished = true
  }

  return root
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
  const s1 = source1()
  const s2 = source2()

  while (true) {
    const s1v = s1.next()
    const s2v = s2.next()

    if (!s1v.done && !s2v.done) {
      if (s1v.value <= s2v.value) {
        yield s1v.value
        yield s2v.value
      } else {
        yield s2v.value
        yield s1v.value
      }
    }
    else if(!s1v.done) yield s1v.value
    else if(!s2v.done) yield s2v.value
    else break
  }
}


module.exports = {
  get99BottlesOfBeer: get99BottlesOfBeer,
  getFibonacciSequence: getFibonacciSequence,
  depthTraversalTree: depthTraversalTree,
  mergeSortedSequences: mergeSortedSequences,
}
