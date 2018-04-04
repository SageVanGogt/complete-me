import Node from './Node.js'
class Trie {
  constructor() {
    this.root = new Node(null)
    this.wordCount = 0; 
    this.suggestions = [];   
  }

  add(word) {
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

  suggest(str) {
    this.suggestions = [];
    let currentNode = this.findStartNode(str);
    
    if(!currentNode) { return null };

    this.findWordSuggestions(currentNode, str);

    return this.suggestions;
  }
  
  findWordSuggestions(startingNode, prefix) {
    if (startingNode.isWord) {
      this.suggestions.push(prefix);
    }
    Object.keys(startingNode.children).forEach( childLetter => {
      let currentNode = startingNode.children[childLetter];
      
      return this.findWordSuggestions(currentNode, prefix + childLetter);      
    })
  }

  delete(str) {
    let currentNode = this.findStartNode(str)
    if (currentNode.isWord) {
      currentNode.isWord = false;
      this.wordCount--;
    }
  }
  
  populate(data) {
    data.forEach( word => this.add(word));
  }

}

module.exports = Trie;