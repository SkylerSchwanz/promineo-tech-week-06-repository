import 'mocha';
import { expect } from 'chai';
import { Card } from './Classes/Card.js';
import { Deck } from './Classes/Deck.js';
import { Player } from './Classes/Player.js';
import { playWar } from './War.js';
import { getWinner } from './War.js';

describe('War card game', () => {
  it('should create a deck of cards', () => {
    const deck = new Deck();
    expect(deck.cards.length).to.equal(52);
  });

  it('should shuffle the deck of cards', () => {
    const deck = new Deck();
    const shuffledDeck = new Deck();
    shuffledDeck.shuffle();
    expect(shuffledDeck.cards.every((card, index) => index === deck.cards.indexOf(card))).to.equal(false);
  });

  it('should deal cards to two players', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    const deck = new Deck();
    deck.shuffle();
    deck.deal(player1, player2);
    expect(player1.hand.length).to.equal(26);
    expect(player2.hand.length).to.equal(26);
  });

  describe('should compare cards and determine the winner of a round', () => {
    // Player 1 has a higher card
    it('Should return player 1 having the higher card', () => {
      const player1 = new Player('Player 1');
      const player2 = new Player('Player 2');

      player1.hand.push(new Card('Spades', 'Ace'));
      player2.hand.push(new Card('Hearts', '2'));

      expect(playWar(player1, player2)).to.equal(player1);
    });

    // Player 2 has a higher card
    it('Should return player 2 having the higher card', () => {
      const player1 = new Player('PLayer 1');
      const player2 = new Player('Player 2');

      player1.hand.push(new Card('Spades', '2'));
      player2.hand.push(new Card('Hearts', 'Ace'));

      expect(playWar(player1, player2)).to.equal(player2);
    });

    // War!
    it('Should return null; a war is underway', () => {
      const player1 = new Player('Player 1');
      const player2 = new Player('Player 2');

      player1.hand.push(new Card('Spades', '3'));
      player2.hand.push(new Card('Hearts', '3'));

      expect(playWar(player1, player2)).to.equal(null);
    });
  });

  it('should determine the winner of the game', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    const deck = new Deck();
    deck.shuffle();
    deck.deal(player1, player2);

    // Player 1 has more points
    player1.addPoint();
    expect(player1.points).to.equal(1);
    expect(player2.points).to.equal(0);
    expect(getWinner(player1, player2)).to.equal(player1);

    // Both players have the same points
    player2.addPoint();
    expect(player1.points).to.equal(1);
    expect(player2.points).to.equal(1);
    expect(getWinner(player1, player2)).to.equal(null);
  });
});