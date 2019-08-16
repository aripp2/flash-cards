const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.currentCard;
    this.incorrectGuesses = [];
    this.startTime = Date.now();
  }

  returnCurrentCard() {
    this.currentCard = this.deck[this.turns];
    return this.currentCard;
  }

  takeTurn(guess) {
    let turn = new Turn(guess, this.returnCurrentCard());
    this.turns++;
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.currentCard.id);
      return turn.giveFeedback();
    } else {
      return turn.giveFeedback();
    }
  }

  calculatePercentCorrect() {
    return +(((this.turns - this.incorrectGuesses.length) / this.turns) * 100).toFixed(2);
  }

  caluculateTime() {
    let endTime = Date.now();
    let playTime = endTime - this.startTime;
    var minutes = Math.floor(playTime / 60000);
    var seconds = ((playTime % 60000) / 1000).toFixed(0);
    return `${minutes} minutes and ${seconds} seconds.`;
  }

  endRound() {
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly! It took you ${this.caluculateTime()}`;
  }
}

module.exports = Round;