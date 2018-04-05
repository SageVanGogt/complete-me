import Node from './Node.js'
class Trie {
  constructor() {
    this.root = new Node(null)
    this.wordCount = 0; 
    this.suggestions = [];  
    this.suggestionsWordOnly = [];
  }

  add(inputWord) {
    let word = inputWord.toLowerCase();
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!currentNode.children[word[i]]) {
        currentNode.children[word[i]] = new Node(word[i]);
      }
      currentNode = currentNode.children[word[i]];
    }
    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
    }
  }

  findStartNode(str) {
    let strArray = Array.from(str); 
    let currentNode = this.root;

    while (strArray.length) {
      let letter = strArray.shift();
      let child = currentNode.children[letter];
      if(!child) {
        return null;
      }
      currentNode = child; 
    }
    return currentNode
  }
  
  suggest(inputStr) {
    this.resetSuggestions();
    let str = inputStr.toLowerCase();
    let currentNode = this.findStartNode(str);
    
    if(!currentNode) { return null };
    this.findWordSuggestions(currentNode, str);

    this.sortSuggestions();
    this.getSuggestions();
  
    return this.suggestionsWordOnly;
  }

  sortSuggestions() {
    this.suggestions.sort( (a, b) => {
      return b.chosen - a.chosen 
    })
  }

  getSuggestions() {
    this.suggestions.forEach(wordObj => {
      this.suggestionsWordOnly.push(wordObj.word);
    })
  }
  
  findWordSuggestions(startingNode, prefix) {
    if (startingNode.isWord) {
      this.formatSuggestion(startingNode, prefix)
    }
    Object.keys(startingNode.children).forEach( childLetter => {
      let currentNode = startingNode.children[childLetter];
      return this.findWordSuggestions(currentNode, prefix + childLetter);      
    })
  }

  formatSuggestion(node, word) {
    this.suggestions.push({
      word: word,
      commonality: node.chosen
    });
  }
  
  delete(str) {
    let currentNode = this.findStartNode(str);
    
    if (currentNode.isWord) {
      currentNode.isWord = false;
      this.wordCount--;
    }
  }

  select(word) {
    let currNode = this.findStartNode(word);

    currNode.chosen++;
  }

  resetSuggestions() {
    this.suggestions = [];
    this.suggestionsWordOnly = [];
    
  }
  
  populate(dictionary) {
    dictionary.forEach( word => this.add(word));
  }
  
}

module.exports = Trie;