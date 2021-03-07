class Player {
  static BLACK = 'BLACK'
  static RED = 'RED'
  static getOpponent(color) {
    switch (color) {
      case this.BLACK: return this.RED
      case this.RED: return this.BLACK
      default: throw new Error('Unknown player color: ' + color)
    }
  }
}

export default Player