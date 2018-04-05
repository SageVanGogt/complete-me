const Trie = require('./..//scripts/trie');
const chai = require('chai');
const assert = chai.assert;
const fs = require('fs')

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe ('Trie', () => {

  describe('insert', () => {
    it('should add new words to the trie', () => {
      const trie = new Trie();

      trie.add('pizza');

      assert.equal(trie.wordCount, 1);
      
      trie.add('pizzeria');
      
      assert.equal(trie.wordCount, 2);
    })

    it('should not increase wordcount of trie contains word', () => {
      const trie = new Trie();

      trie.add('apple');
      trie.add('apple');
      trie.add('Apple');
      trie.add('pizza');
      trie.add('party');

      assert.equal(trie.wordCount, 3);
    })

    it('should not increase wordcount if a similar word is added but with capitals', () => {
      const trie = new Trie();

      trie.add('apple');
      trie.add('apple');
      trie.add('Apple');
      trie.add('aPPle');

      assert.equal(trie.wordCount, 1);
    })

    it('should take in a large data set and add to trie', () => {
      const completion = new Trie();

      completion.populate(dictionary);

      assert.equal(completion.wordCount, 234371);
    })
  }),

  describe('suggest', () => {
    it('should suggest possible words from a given prefix', () => {
      const trie = new Trie();

      trie.add('puppy');
      trie.add('puppers');


      let suggested = trie.suggest('pup');
      assert.deepEqual(suggested, ['puppy', 'puppers']);
    })

    it('should not be case sensative', () => {
      const trie = new Trie();

      trie.add('puppy');
      trie.add('puppers');


      let suggested = trie.suggest('PUP');
      assert.deepEqual(suggested, ['puppy', 'puppers']);
    })

    it('should search large trie and suggest possible words from a given prefix', () => {
      const trie = new Trie();

      trie.populate(dictionary);

      let suggested = trie.suggest('zyz');
      
      assert.deepEqual(suggested, ['zyzomys', 'zyzzogeton']);
      
    })
  })
    
  describe('delete', () => {
    it('should delete a suggestion', () => {
      let trie = new Trie(); 

      trie.add('cat');
      trie.add('catius');
      trie.add('cactus');
      trie.add('cathere');

      trie.delete('cactus');

      let suggested = trie.suggest('ca');
      
      assert.deepEqual(suggested, ['cat', 'catius', 'cathere']);
    })

    it('should decrease wordcount', () => {
      let trie = new Trie(); 

      trie.add('cat');
      trie.add('catius');
      trie.add('cactus');
      trie.add('cathere');

      assert.equal(trie.wordCount, 4);

      trie.delete('cactus');

      assert.equal(trie.wordCount, 3);
    })
  })

  describe('select', () => {

    it('should increase our nodes chosen count', () => {
      let trie = new Trie();

      trie.add('boat');
      trie.add('bore');
      trie.add('blob');
      trie.select('boat');
      let currNode = trie.findStartNode('boat');
      let suggestions = trie.suggest('bo');

      assert.equal(currNode.chosen, 1);
    })

  })

})