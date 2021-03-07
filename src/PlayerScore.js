import React from 'react'
import {minimax} from './game/AI'
import Player from './game/Player'

import './PlayerScore.css'

const ALPHA = 'ABCDEFGHIJKLMNOP'

const printCell = ({x, y}) => `${ALPHA.charAt(x)}${y+1}`

const printLine = (game) => {
  return game.getMoves().map((cell) => printCell(cell)).join(' -> ')
}

const printBestLine = (game, player) => {
  const [bestGame, bestScore] = minimax(game, player, 6, true)
  const currentScore = game.getScore()[player] - game.getScore()[Player.getOpponent(player)]
  console.log(`${printCell(bestGame.getMoves()[game.getMoves().length])} (${currentScore} -> ${bestScore})`)
  // console.log(`Game ${printLine(game)} (${currentScore})`)
  // console.log(`Best ${printLine(bestGame)} (${bestScore})`)
}

const PlayerScore = ({ player, game, winner, setGame }) => {
  let bestMove = null
  if (player === Player.BLACK && game.getNextMove() === player && game.getMoves().length > 0) {
    setTimeout(() => {
      console.log('Computing best move for black...')
      const [bestGame, bestScore] = minimax(game, player, 6, true)
      const bestCell = bestGame.getMoves()[game.getMoves().length]
      if (bestCell) {
        bestMove = printCell(bestCell)
        setGame(game.makeMove(bestCell.x, bestCell.y))
      }
    }, 1000)
  }

  return (
    <div className="player_score">
      <h2>Player: {player} {game.getNextMove() === player && '<'}</h2>
      <div>Score: {game.getScore()[player]}</div>
      <div>Marbles: {game.getMarblesRemaining()[player]}</div>
      {bestMove && <div>Next Move: {bestMove}</div>}
      {winner && winner === player && <div>WINNER!</div>}

    </div>
  )
}

export default PlayerScore