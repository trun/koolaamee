import React from 'react'

import './PlayerScore.css'

const PlayerScore = ({ player, game, winner }) => {
  return (
    <div className="player_score">
      <h2>Player: {player}</h2>
      <div>Score: {game.getScore()[player]}</div>
      <div>Marbles: {game.getMarblesRemaining()[player]}</div>
      {winner && winner === player && <div>WINNER!</div>}
    </div>
  )
}

export default PlayerScore