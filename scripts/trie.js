import Node from './Node.js'
class Trie {
  constructor() {
    this.root = new Node(null);
    this.wordCount = 0; 
    this.suggestions = [];  
    this.sortedSuggestions = [];
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
    this.findWordSuggestions(currentNode, str); //create suggestions array w unsorted objects

    this.sortSuggestions(); //takes suggestions array full of objects and sorts them by weight
    this.getSuggestions(); //iterates over sorted suggestions and pushed obj.word into sortedsuggestions array
  
    return this.sortedSuggestions;
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
  
  sortSuggestions() {
    this.suggestions.sort( (a, b) => {
      return b.commonality - a.commonality;
    })
  }

  getSuggestions() {
    this.suggestions.forEach(wordObj => {
      this.sortedSuggestions.push(wordObj.word);
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
    this.sortedSuggestions = [];
    
  }
  
  populate(dictionary) {
    dictionary.forEach( word => this.add(word));
  }
  
}

module.exports = Trie;