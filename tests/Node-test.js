const Node = require('../scripts/Node');
const chai = require('chai');
const assert = chai.assert;

describe ('Node', () => {
  it('should hold whatever value is passed into it', () => {
    let node = new Node('a');

    assert.equal(node.letter, 'a')
  });

  it('should have a value of null if not given a value', () => {
    let node = new Node();

    assert.equal(node.letter, null)
  })

  it('should have an empty children object when instantiated', () => {
    let node = new Node('n');

    assert.deepEqual(node.children, {})
  })
})