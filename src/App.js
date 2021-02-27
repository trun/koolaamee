import React from 'react'
import Board from './game/Board'
import Piece from './game/Piece'
import Marble from './game/Marble'
import './App.css'

const board = new Board()
board.addPiece(new Piece(3, 0, 1, 3))
board.addPiece(new Piece(4, 1, 2, 2))
board.addPiece(new Piece(6, 1, 2, 2))
board.addPiece(new Piece(8, 1, 2, 3))
board.addPiece(new Piece(0, 4, 1, 2))
board.addPiece(new Piece(1, 3, 2, 2))
board.addPiece(new Piece(1, 5, 2, 2))
board.addPiece(new Piece(3, 3, 3, 1))
board.addPiece(new Piece(6, 3, 2, 1))
board.addPiece(new Piece(3, 4, 3, 2))
board.addPiece(new Piece(6, 4, 2, 2))
board.addPiece(new Piece(8, 4, 2, 1))
board.addPiece(new Piece(3, 6, 3, 2))
board.addPiece(new Piece(6, 6, 1, 3))
board.addPiece(new Piece(7, 6, 1, 2))
board.addPiece(new Piece(3, 8, 3, 1))
board.addPiece(new Piece(8, 5, 2, 3))

board.addMarble(new Marble(6, 6, 'RED'))
board.addMarble(new Marble(2, 4, 'RED'))
board.addMarble(new Marble(5, 4, 'RED'))
board.addMarble(new Marble(2, 3, 'BLACK'))
board.addMarble(new Marble(2, 5, 'BLACK'))
board.addMarble(new Marble(5, 5, 'BLACK'))

function App() {
  return (
    <div className="wrapper">
      {board.getPieces().map(piece => (
        <div
          className={piece.getClassName()}
          style={{
            gridColumn: `${piece.getX() + 1} / ${piece.getX() + 1 + piece.getWidth()}`,
            gridRow:`${piece.getY() + 1} / ${piece.getY() + 1 + piece.getHeight()}`,
          }}
        />
      ))}
      {board.getCells().map(cell => (
        <div
          className={`marble ${cell.marble && cell.marble.getClassName()}`}
          style={{
            gridColumn: `${cell.x + 1} / ${cell.x + 1}`,
            gridRow: `${cell.y + 1} / ${cell.y + 1}`,
          }}
        />
      ))}
    </div>
  );
}

export default App;
