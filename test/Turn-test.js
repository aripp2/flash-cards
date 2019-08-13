const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', () => {

  let card, turn;

  beforeEach(() => {
    card = new Card({
      'id': 1, 
      'question': 'What allows you to define a set of related information using key-value pairs?', 
      'answers': ['object', 'array', 'function'], 
      'correctAnswer': 'object'})
    turn = new Turn('object', card)
  });

  it('should be a function', () => {
    expect(Turn).to.be.a('function');
  });

  it('should return the guess', () => {
    expect(turn.returnGuess()).to.equal('object');
  });

  it('should return the card', () => {
    expect(turn.returnCard()).to.eql({
      'id': 1, 
      'question': 'What allows you to define a set of related information using key-value pairs?', 
      'answers': ['object', 'array', 'function'], 
      'correctAnswer': 'object'})
  });

  it('should evaluate the user guess', () => {
    expect(turn.evaluateGuess()).to.equal(true);
  });

  it('should give the user feedback for their guess', () => {
    expect(turn.giveFeedback()).to.equal('Correct!!!');
  });

})