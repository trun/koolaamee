import Piece from './Piece'

const COLS = 10

const xyToOffset = (x, y) => {
  return y * COLS + x
}

const offsetToXY = (offset) => {
  const y = Math.floor(offset / COLS)
  const x = offset % COLS
  return [x, y]
}

class Board {
  constructor(pieces = []) {
    this.pieces = []
    this.pieceGrid = []

    this.marbles = []
    this.marbleGrid = []

    pieces.forEach(([x, y, w, h]) => this.addPiece(new Piece(x, y, w, h)))
  }

  getPieces = () => {
    return this.pieces;
  }

  getMarbles = () => {
    return this.marbles
  }

  getCell = (x, y) => {
    const offset = xyToOffset(x, y)
    return {
      offset,
      x,
      y,
      piece: this.pieceGrid[offset],
      marble: this.marbleGrid[offset]
    }
  }

  getCells = () => {
    return this.pieceGrid.map((piece, offset) => {
      const [x, y] = offsetToXY(offset)
      return {
        offset,
        x,
        y,
        piece,
        marble: this.marbleGrid[offset],
      }
    })
  }

  addPiece = (piece) => {
    // check validity
    if (!this.isValid(piece)) {
      console.error(`Cannot place overlapping piece: ${piece.toString()}`)
      return
    }

    this.pieces.push(piece)
    piece.getCells().forEach(([x, y]) => {
      this.pieceGrid[xyToOffset(x, y)] = piece
    })
  }

  addMarble = (marble) => {
    const offset = xyToOffset(marble.getX(), marble.getY())

    // check that it's a valid cell
    if (!this.pieceGrid[offset]) {
      console.error('Can only place marbles onto pieces')
      return
    }

    // check that it's an empty cell
    if (!!this.marbleGrid[offset]) {
      console.error('Cannot place marble on an existing marble')
      return
    }

    // TODO check that it's a valid play

    this.marbles.push(marble)
    this.marbleGrid[offset] = marble
  }

  isValid = (piece) => {
    return piece.getCells().every(([x, y]) => !this.pieceGrid[xyToOffset(x, y)])
  }

  clone = () => {
    const board = new Board()
    board.pieces = this.pieces.concat()
    board.pieceGrid = this.pieceGrid.concat()
    board.marbles = this.marbles.concat()
    board.marbleGrid = this.marbleGrid.concat()
    return board
  }
}

export default Board