import React, { useState } from 'react'
import Board from './game/Board'
import Piece from './game/Piece'
import Game from './game/Game'
import PlayerScore from './PlayerScore'
import './World.css'

const initialBoard = new Board()
initialBoard.addPiece(new Piece(3, 0, 1, 3))
initialBoard.addPiece(new Piece(4, 1, 2, 2))
initialBoard.addPiece(new Piece(6, 1, 2, 2))
initialBoard.addPiece(new Piece(8, 1, 2, 3))
initialBoard.addPiece(new Piece(0, 4, 1, 2))
initialBoard.addPiece(new Piece(1, 3, 2, 2))
initialBoard.addPiece(new Piece(1, 5, 2, 2))
initialBoard.addPiece(new Piece(3, 3, 3, 1))
initialBoard.addPiece(new Piece(6, 3, 2, 1))
initialBoard.addPiece(new Piece(3, 4, 3, 2))
initialBoard.addPiece(new Piece(6, 4, 2, 2))
initialBoard.addPiece(new Piece(8, 4, 2, 1))
initialBoard.addPiece(new Piece(3, 6, 3, 2))
initialBoard.addPiece(new Piece(6, 6, 1, 3))
initialBoard.addPiece(new Piece(7, 6, 1, 2))
initialBoard.addPiece(new Piece(3, 8, 3, 1))
initialBoard.addPiece(new Piece(8, 5, 2, 3))

const initialGame = new Game({ board: initialBoard })

function World() {
  const [game, setGame] = useState(initialGame)
  const board = game.getBoard()
  const makeClickHandler = (x, y) => () => setGame(game.makeMove(x, y))

  const validMoves = game.getValidMoves()
  const validOffsets = validMoves.reduce((offsets, cell) => {
    offsets[cell.offset] = cell
    return offsets
  }, {})

  const score = game.getScore()
  const marblesRemaining = game.getMarblesRemaining()

  const gameOver = validMoves.length === 0
    || marblesRemaining[game.getNextMove()] === 0

  console.log('MARBLES LEFT', marblesRemaining[game.getNextMove()])
  console.log('VALID MOVES', validMoves)

  let winner;
  if (gameOver) {
    if (score['RED'] > score['BLACK']) {
      winner = 'RED'
    } else if (score['RED'] < score['BLACK']) {
      winner = 'BLACK'
    } else {
      winner = 'TIE'
    }
  }

  return (
    <div className="game">
      <div className="board">
        {board.getPieces().map((piece, i) => (
          <div
            key={i}
            className={piece.getClassName()}
            style={{
              gridColumn: `${piece.getX() + 1} / ${piece.getX() + 1 + piece.getWidth()}`,
              gridRow:`${piece.getY() + 1} / ${piece.getY() + 1 + piece.getHeight()}`,
            }}
          />
        ))}
        {board.getCells().map(cell => {
          const isValid = !!validOffsets[cell.offset]
          return (
            <div
              key={cell.offset}
              onClick={!!isValid ? makeClickHandler(cell.x, cell.y) : null}
              className={`marble ${isValid && 'valid'} ${cell.marble && cell.marble.getClassName()}`}
              style={{
                gridColumn: `${cell.x + 1} / ${cell.x + 1}`,
                gridRow: `${cell.y + 1} / ${cell.y + 1}`,
              }}
            />
          )
        })}
      </div>
      <div className="game_info">
        <PlayerScore player="RED" game={game} winner={winner} />
        <PlayerScore player="BLACK" game={game} winner={winner} />
      </div>
    </div>
  )
}

export default World;
