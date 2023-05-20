class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.points = 0;
  }

  addPoint() {
    this.points++;
  }
}

export { Player };