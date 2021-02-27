class Piece {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  getOrigin = () => {
    return [this.x, this.y]
  }

  getX = () => {
    return this.x
  }

  getY = () => {
    return this.y
  }

  getWidth = () => {
    return this.w
  }

  getHeight = () => {
    return this.h
  }

  getCells = () => {
    const cells = []
    for (let x = this.x; x < this.x + this.w; x++) {
      for (let y = this.y; y < this.y + this.h; y++) {
        cells.push([x, y])
      }
    }
    return cells
  }

  getClassName = () => {
    switch (this.getWidth() * this.getHeight()) {
      case 2: return 'two'
      case 3: return 'three'
      case 4: return 'four'
      case 6: return 'six'
      default: return 'invalid'
    }
  }
}

export default Piece