import Player from './Player'

export const minimax = (game, maximizingPlayer, depth = 5, maximizing = true) => {
  const validMoves = game.getValidMoves()
  const marblesRemaining = game.getMarblesRemaining()[game.getNextMove()]
  const scores = game.getScore()

  const ownScore = scores[maximizingPlayer]
  const oppScore = scores[Player.getOpponent(maximizingPlayer)]

  // if the game is finished
  if (validMoves.length === 0 || marblesRemaining === 0) {
    if (ownScore > oppScore) {
      return [game, 1000]
    } else if (oppScore > ownScore) {
      return [game, -1000]
    } else {
      return [game, 0]
    }
  }

  // if max depth is reached
  if (depth === 0) {
    return [game, ownScore - oppScore]
  }

  // otherwise, recurse
  const compare = maximizing ? (a, b) => a > b : (a, b) => a < b
  const initialScore = maximizing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

  return validMoves.reduce(([bestGame, bestScore], cell) => {
    const [nextGame, nextScore] = minimax(game.makeMove(cell.x, cell.y), maximizingPlayer, depth - 1, !maximizing)
    if (compare(nextScore, bestScore)) {
      return [nextGame, nextScore]
    } else {
      return [bestGame, bestScore]
    }
  }, [null, initialScore])

  // if (maximizing) {
  //   return validMoves.reduce(([maxGame, maxScore], cell) => {
  //     const [nextGame, nextScore] = minimax(game.makeMove(cell.x, cell.y), maximizingPlayer, depth - 1, false)
  //     if (nextScore > maxScore) {
  //       return [nextGame, nextScore]
  //     } else {
  //       return [maxGame, maxScore]
  //     }
  //   }, [null, Number.NEGATIVE_INFINITY])
  // } else {
  //   return validMoves.reduce(([minGame, minScore], cell) => {
  //     const [nextGame, nextScore] = minimax(game.makeMove(cell.x, cell.y), maximizingPlayer, depth - 1, false)
  //     if (nextScore < minScore) {
  //       return [nextGame, nextScore]
  //     } else {
  //       return [minGame, minScore]
  //     }
  //   }, [null, Number.POSITIVE_INFINITY])
  // }
}
