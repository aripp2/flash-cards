const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('../src/Card');

describe('Round', () => {

  let card1, card2, card3, deck, round;

  beforeEach(() => {
    card1 = new Card({
      "id": 1, 
      "question": "What allows you to define a set of related information using key-value pairs?", 
      "answers": ['object', 'array', 'function'], 
      "correctAnswer": "object"});
    card2 = new Card({
      "id": 2,
      "question": "What is a comma-separated list of related values?",
      "answers": ["array", "object", "function"],
      "correctAnswer": "array"});
    card3 = new Card({
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answers": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"});
    deck = new Deck([card1, card2, card3])
    round = new Round(deck);
  });

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  });

  it('should return the current card', () => {
    expect(round.returnCurrentCard()).to.eql({
      "id": 1, 
      "question": "What allows you to define a set of related information using key-value pairs?", 
      "answers": ['object', 'array', 'function'], 
      "correctAnswer": "object"})
  });

  it('should update the turns count', () => {
    round.takeTurn('object');
    round.takeTurn('object');
    expect(round.turns).to.equal(2);
  });

  it('should store incorrect guesses by id', () => {
    round.takeTurn('array');
    round.takeTurn('object');
    expect(round.incorrectGuesses).to.eql([1, 2]);
  });

  it('should calculate the percent correct', () => {
    round.takeTurn('object');
    round.takeTurn('array');
    round.takeTurn('iteration method');
    expect(round.calculatePercentCorrect()).to.equal(66.67)
  });

  it('should tell you when round is over', () => {
    round.takeTurn('object');
    round.takeTurn('array');
    round.takeTurn('iteration method');
    expect(round.endRound()).to.equal('** Round over! ** You answered 66.67% of the questions correctly!')
  });


});