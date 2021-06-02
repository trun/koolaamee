import Marble from './Marble'

const PLAYER_A = 'BLACK'
const PLAYER_B = 'RED'

const COLS = 10
const ROWS = 10

const INITIAL_MARBLES = {
  [PLAYER_A]: 28,
  [PLAYER_B]: 28,
}

class Game {
  constructor({
    board,
    nextMove = PLAYER_B,
    lastMove,
    lastLastMove,
    moves = [],
    marblesRemaining = INITIAL_MARBLES
  }) {
    this.board = board
    this.nextMove = nextMove
    this.lastMove = lastMove
    this.lastLastMove = lastLastMove
    this.moves = moves
    this.marblesRemaining = marblesRemaining
    this.validMoves = this.computeValidMoves()
    this.score = this.computeScore()
  }

  getBoard = () => {
    return this.board
  }

  getNextMove = () => {
    return this.nextMove
  }

  getLastMove = () => {
    return this.lastMove
  }

  getLastLastMove = () => {
    return this.lastLastMove
  }

  getMoves = () => {
    return this.moves
  }

  getMarblesRemaining = () => {
    return this.marblesRemaining
  }

  getScore = () => {
    return this.score
  }

  getValidMoves = () => {
    return this.validMoves
  }

  computeScore = () => {
    const score = {
      [PLAYER_A]: 0,
      [PLAYER_B]: 0,
    }

    this.board.getPieces().forEach(piece => {
      const pieceScore = {
        [PLAYER_A]: 0,
        [PLAYER_B]: 0,
      }

      piece.getCells().forEach(([x, y]) => {
        const marble = this.board.getCell(x, y).marble
        if (!!marble) {
          pieceScore[marble.getColor()] += 1
        }
      })

      if (pieceScore[PLAYER_A] > pieceScore[PLAYER_B]) {
        score[PLAYER_A] += piece.getScore()
      } else if (pieceScore[PLAYER_B] > pieceScore[PLAYER_A]) {
        score[PLAYER_B] += piece.getScore()
      }
    })

    return score
  }

  computeValidMoves = () =>  {
    if (!this.lastMove) {
      return this.board.getCells()
    }

    const lastPiece = this.board.getCell(this.lastMove.x, this.lastMove.y).piece
    const lastLastPiece = this.lastLastMove && this.board.getCell(this.lastLastMove.x, this.lastLastMove.y).piece
    const isValidCell = (cell) => {
      return cell.piece
        && !cell.marble
        && cell.piece !== lastPiece
        && cell.piece !== lastLastPiece
    }

    const validMoves = []
    for (let x = 0; x < COLS; x++) {
      const cell = this.board.getCell(x, this.lastMove.y)
      if (isValidCell(cell)) {
        validMoves.push(cell)
      }
    }
    for (let y = 0; y < ROWS; y++) {
      const cell = this.board.getCell(this.lastMove.x, y)
      if (isValidCell(cell)) {
        validMoves.push(cell)
      }
    }

    return validMoves
  }

  makeMove = (x, y) => {
    const nextBoard = this.board.clone()
    nextBoard.addMarble(new Marble(x, y, this.nextMove))

    return new Game({
      board: nextBoard,
      nextMove: this.nextMove === PLAYER_A ? PLAYER_B : PLAYER_A,
      lastMove: {x, y},
      lastLastMove: this.lastMove,
      moves: this.moves.concat([{x, y}]),
      marblesRemaining: {
        [PLAYER_A]: this.marblesRemaining[PLAYER_A] - (this.nextMove === PLAYER_A ? 1 : 0),
        [PLAYER_B]: this.marblesRemaining[PLAYER_B] - (this.nextMove === PLAYER_B ? 1 : 0),
      }
    })
  }
}

export default Game