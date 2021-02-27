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
    nextMove = PLAYER_A,
    lastMove,
    lastLastMove,
    marblesRemaining = INITIAL_MARBLES
  }) {
    this.board = board
    this.nextMove = nextMove
    this.lastMove = lastMove
    this.lastLastMove = lastLastMove
    this.marblesRemaining = marblesRemaining
  }

  getBoard = () => {
    return this.board
  }

  getValidMoves = () =>  {
    if (!this.lastMove) {
      return this.board.getCells()
    }

    const lastPiece = this.board.getCell(this.lastMove.x, this.lastMove.y).piece
    const lastLastPiece = this.lastLastMove && this.board.getCell(this.lastLastMove.x, this.lastLastMove.y).piece
    const isValidCell = (cell) => {
      return cell.piece
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
    // TODO check if it's a valid move
    const nextBoard = this.board.clone()
    nextBoard.addMarble(new Marble(x, y, this.nextMove))

    const nextGame = new Game({
      board: nextBoard,
      nextMove: this.nextMove === PLAYER_A ? PLAYER_B : PLAYER_A,
      lastMove: { x, y },
      lastLastMove: this.lastMove,
      marblesRemaining: {
        [PLAYER_A]: this.marblesRemaining[PLAYER_A] - (this.nextMove === PLAYER_A ? 1 : 0),
        [PLAYER_B]: this.marblesRemaining[PLAYER_B] - (this.nextMove === PLAYER_B ? 1 : 0),
      }
    })

    return nextGame
  }
}

export default Game