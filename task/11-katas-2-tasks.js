'use strict'

/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
  const phrases = text.split(' ').reverse()
  let phrase = phrases.pop()

  while (phrases.length) {
    const ph = phrases.pop()

    if ([phrase, ph].join(' ').length <= columns) {
      phrase = [phrase, ph].join(' ')
    } else {
      yield phrase
      phrase = ph
    }
  }

  yield phrase
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0,
}

function getPokerHandRank(hand) {
  const rankArray = []
  const suitArray = []

  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  const getRank = (card) => card.slice(0, -1)
  const getSuit = (card) => card.slice(-1)

  const sortedHand = (() => {
    let sH = []
    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < hand.length; j++) {
        if (ranks[i] === getRank(hand[j])) {
          sH.push(hand[j])
        }
      }
    }
    return sH
  })()

  for (const card of sortedHand) {
    rankArray.push(getRank(card))
    suitArray.push(getSuit(card))
  }

  const countSuites = suitArray.reduce((previousValue, currentValue) => {
    return { ...previousValue, [currentValue]: (previousValue[currentValue] || 0) + 1 }
  }, {})

  const countRanks = rankArray.reduce((previousValue, currentValue) => {
    return { ...previousValue, [currentValue]: (previousValue[currentValue] || 0) + 1 }
  }, {})

  const isFlush = () => {
    return !!Object.keys(countSuites).find(key => countSuites[key] === 5)
  }

  const isStraight = () => {
    let index = ranks.indexOf(rankArray[0])
    let ref = ranks.slice(index, index + 5).join('')
    let section = rankArray.join('')

    return section === 'AKQJ10' || section === '2345A' || section === ref
  }

  const isFourOfKind = () => {
    return Object.keys(countRanks).filter(key => countRanks[key] === 4).length
  }

  const isThreeOfKind = () => {
    return Object.keys(countRanks).filter(key => countRanks[key] === 3).length
  }

  const isPairs = () => {
    return Object.keys(countRanks).filter(key => countRanks[key] === 2).length
  }

  if (isStraight() && isFlush()) {
    return PokerRank.StraightFlush
  }

  if (isFourOfKind()) {
    return PokerRank.FourOfKind
  }

  if (isThreeOfKind() && isPairs() === 1) {
    return PokerRank.FullHouse
  }

  if (isFlush()) {
    return PokerRank.Flush
  }

  if (isStraight()) {
    return PokerRank.Straight
  }

  if (isThreeOfKind()) {
    return PokerRank.ThreeOfKind
  }

  if (isPairs() === 2) {
    return PokerRank.TwoPairs
  }

  if (isPairs() === 1) {
    return PokerRank.OnePair
  }

  return PokerRank.HighCard
}

module.exports = {
  wrapText: wrapText,
  PokerRank: PokerRank,
  getPokerHandRank: getPokerHandRank,
}
