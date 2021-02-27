import React, { useState } from 'react'
import Board from './game/Board'
import Piece from './game/Piece'
import Game from './game/Game'
import './App.css'

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

function App() {
  const [game, setGame] = useState(initialGame)
  const board = game.getBoard()
  const makeClickHandler = (x, y) => () => setGame(game.makeMove(x, y))

  const validMoves = game.getValidMoves()
  const validOffsets = validMoves.reduce((offsets, cell) => {
    offsets[cell.offset] = cell
    return offsets
  }, {})

  console.log(validMoves)
  console.log(validOffsets)

  return (
    <div className="wrapper">
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
  );
}

export default App;
