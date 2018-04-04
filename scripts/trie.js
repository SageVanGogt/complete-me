import Node from './Node.js'
class Trie {
  constructor() {
    this.root = new Node(null)
    this.wordCount = 0; 
    this.suggestions = [];   
  }

  add(word) {
    let currentNode = this.root;
    let childExistCount = 0;

   for (let i = 0; i < word.length; i++) {
     if (!currentNode.children[word[i]]) {
       currentNode.children[word[i]] = new Node(word[i]);
     } else {
      childExistCount++;
     }
     currentNode = currentNode.children[word[i]];
   }

    currentNode.isWord = true;
    this.increaseWordCount(childExistCount, word.length);
  }

  increaseWordCount(noNewLetters, addedWord) {
    if (noNewLetters != addedWord) {
      this.wordCount++;
    }
  }

  suggest(str) {
    let strArray = Array.from(str); 
    let currentNode = this.root;

    while (strArray.length) {
      let letter = strArray.shift();
      let child = currentNode.children[letter];

      currentNode = child; 
    }

    this.findWordSuggestions(currentNode, str);

    return this.suggestions
  }
  
  findWordSuggestions(startingNode, prefix) {
    Object.keys(startingNode.children).forEach( childLetter => {
      let currentNode = startingNode.children[childLetter];
      
      if (currentNode.isWord) {
        this.suggestions.push(prefix + childLetter);
      }
      return this.findWordSuggestions(currentNode, prefix + childLetter);      
    })
  }

  populate(data) {
    data.forEach( word => this.add(word));
  }
  // createWord(prefix, letter) {
  //   this.suggestions.push(
  //     {
  //       word: prefix + letter
  //     }
  //   )
  //   return;
  // }
  

}

module.exports = Trie;

