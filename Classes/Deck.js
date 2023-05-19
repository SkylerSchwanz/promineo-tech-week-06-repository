import { Card } from './Card.js';

class Deck {
  constructor() {
    this.cards = [];
    for (const suit of ['Spades', 'Diamonds', 'Clubs', 'Hearts']) {
      for (const value of [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let j = Math.floor(Math.random() * this.cards.length);
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  deal(player1, player2) {
    for (let i = 0; i < this.cards.length; i += 2) {
      player1.hand.push(this.cards[i]);
      player2.hand.push(this.cards[i + 1]);
    }
  }
}

export { Deck };