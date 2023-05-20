import { Player } from './Classes/Player.js';
import { Deck } from './Classes/Deck.js';

export { playWar };
export { getWinner };

let getWinner = (player1, player2) => {
  if (player1.points > player2.points) {
    return player1;
  } else if (player2.points > player1.points) {
    return player2;
  } else {
    return null;
  }
};

const warCards = [];
function playWar(player1, player2) {

  // Get the cards from each player
  const card1 = player1.hand.pop();
  const card2 = player2.hand.pop();

  if (card1.rank > card2.rank) {

    console.log(`${player1.name}'s ${card1.toString()} has won the round! Taking ${player2.name}'s ${card2.toString()}`);

    player1.hand.unshift(card1, card2);
    warCards.forEach((card) => {
      console.warn(`Giving ${player1.name} ${card.toString()}...`);
      player1.hand.unshift(card);
    });

    warCards.length = 0;
    player1.addPoint();

    // if card 2 has a higher value than card 1:
  } else if (card2.rank > card1.rank) {

    console.log(`${player2.name}'s ${card2.toString()} has won the round! Taking ${player1.name}'s ${card1.toString()}`);

    player2.hand.unshift(card2, card1);
    warCards.forEach((card) => {
      console.warn(`Giving ${player2.name} ${card.toString()}...`);
      player2.hand.unshift(card);
    });

    warCards.length = 0;
    player2.addPoint();

  } else if (card1.rank === card2.rank) {

    // War!
    console.warn(`War! ${player1.name}'s ${card1.toString()} ——— ${player2.name}'s ${card2.toString()}`);
    warCards.push(player1.hand.pop(), player2.hand.pop());

    return null;
  }

  return getWinner(player1, player2);
}

const player1 = new Player('Player1');
const player2 = new Player('Player2');

const deck = new Deck();
deck.shuffle();
deck.deal(player1, player2);

while (player1.hand.length > 0 && player2.hand.length > 0) {
  // Compare the cards
  playWar(player1, player2);
}

// Get the winner of the game
let winner, loser;
player1.points > player2.points ? ([winner, loser] = [player1, player2]) : ([winner, loser] = [player2, player1]);

// Display the winner
console.warn(`${winner.name} is the winner with ${winner.points} points — ${winner.points - loser.points} points ahead of ${loser.name}!`);