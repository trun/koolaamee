import React, { useState, useEffect } from 'react'
import { minimax } from './game/AI'
import Player from './game/Player'
import cx from 'classnames'

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
  const [autoMove, setAutoMove] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [depth, setDepth] = useState(6)

  const makeNextMove = (depth, delay = 0) => {
    setThinking(true)
    setTimeout(() => {
      console.log(`Computing best move for ${player}...`)
      const [bestGame] = minimax(game, player, game.getMoves().length === 0 ? Math.min(4, depth) : depth)
      const bestCell = bestGame.getMoves()[game.getMoves().length]
      if (bestCell) {
        setGame(game.makeMove(bestCell.x, bestCell.y))
      }
      setThinking(false)
    }, 0)
  }

  const toggleAutoMove = () => {
    const nextState = !autoMove
    setAutoMove(nextState)
    if (game.getNextMove() === player && nextState) {
      makeNextMove(depth)
    }
  }

  useEffect(() => {
    if (game.getNextMove() === player && autoMove) {
      makeNextMove(depth, 1000)
    }
  }, [game])

  const isPlayerTurn = game.getNextMove() === player

  return (
    <div className="player_score">
      <h2>
        <span className={cx({
          [`player-${player}`]: true,
          'is-player-turn': isPlayerTurn,
        })}>
          {player}
        </span>
      </h2>
      <div>Score: {game.getScore()[player]}</div>
      <div>Marbles: {game.getMarblesRemaining()[player]}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id={`automove-${player}`}
          type="checkbox"
          value={autoMove}
          onChange={() => toggleAutoMove()} />
        <label
          for={`automove-${player}`}
          style={{ fontSize: '12px' }}
        >
          Auto move
        </label>
      </div>
      {/*{bestMove && <div>Next Move: {bestMove}</div>}*/}
      {thinking && <div className="thinking">Thinking...</div>}
      {winner && winner === player && <div>WINNER!</div>}
    </div>
  )
}

export default PlayerScore