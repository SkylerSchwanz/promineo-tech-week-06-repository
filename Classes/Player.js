class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.points = 0;
  }

  addCard(...cards) {
    this.hand.unshift(...cards);
    //push
  }

  addPoint() {
    this.points++;
  }
}

export { Player };