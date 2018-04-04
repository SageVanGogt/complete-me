const Trie = require('./..//scripts/trie');
const chai = require('chai');
const assert = chai.assert;
const fs = require('fs')

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe ('Trie', () => {

  describe('insert', () => {
    it.skip('should add new words to the trie', () => {
      const trie = new Trie();

      trie.add('pizza');
      trie.add('pizzeria');
      
      assert.equal(trie, )
    })

    it('should not increase wordcount of trie contains word', () => {
      const trie = new Trie();

      trie.add('apple')
      trie.add('apple')
      trie.add('pizza')
      trie.add('party')

      assert.equal(trie.wordCount, 3)
    })

    it('should take in a large data set and add to trie', () => {
      const completion = new Trie()

      completion.populate(dictionary);

      assert.equal(completion.wordCount, 235886);
      
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

    it('should suggest possible words from a given prefix', () => {
      const trie = new Trie();

      trie.populate(dictionary)


      let suggested = trie.suggest('Zyz');
      // console.log(suggested)
      
      assert.deepEqual(suggested, ['Zyzomys', 'Zyzzogeton']);
      
    })
  })
    
  describe('delete', () => {
    it('should delete a suggestion', () => {
      let trie = new Trie() 

      trie.add('cat')
      trie.add('catius')
      trie.add('cactus')
      trie.add('cathere')

      trie.delete('cactus')

      let suggested = trie.suggest('ca')
      // console.log(suggested)
      assert.deepEqual(suggested, ['cat', 'catius', 'cathere'])
    })

    it('should decrease wordcount', () => {
      let trie = new Trie() 

      trie.add('cat')
      trie.add('catius')
      trie.add('cactus')
      trie.add('cathere')

      assert.equal(trie.wordCount, 4)

      trie.delete('cactus')

      assert.equal(trie.wordCount, 3)
    })
  })

})