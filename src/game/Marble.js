class Marble {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
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

  getColor = () => {
    return this.color
  }

  getClassName = () => {
    return this.getColor() === 'RED' ? 'marble_red' : 'marble_black'
  }
}

export default Marble