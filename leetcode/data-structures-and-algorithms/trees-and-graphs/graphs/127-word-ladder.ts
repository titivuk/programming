// https://leetcode.com/problems/word-ladder/description/

import { strictEqual } from "assert";

/**
 * @description this is my implementatio which is super slow because of huge time complexity
 */
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  function isAdjacentWord(word: string, nextWord: string) {
    if (word.length !== nextWord.length) {
      return false;
    }

    let charDiff = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== nextWord[i]) {
        charDiff += 1;
      }
    }

    return charDiff === 1;
  }

  let currLvlVertices: string[] = [beginWord],
    nextLvlVertices: string[] = [];

  let visited = new Set([beginWord]);

  let steps = 0;
  while (currLvlVertices.length > 0) {
    // we look for number of words, not transitions, so increment in the beginning
    steps += 1;

    for (const word of currLvlVertices) {
      if (word === endWord) {
        return steps;
      }

      for (const nextWord of wordList) {
        if (visited.has(nextWord) === false && isAdjacentWord(word, nextWord)) {
          visited.add(nextWord);
          nextLvlVertices.push(nextWord);
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
  }

  return 0;
}

function ladderLengthOptimized(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  // this is the optimization I found on leetcode
  const graph = new Map<string, string[]>();
  let key = "";
  for (const word of wordList) {
    // from every word we create word.length combinations where single char is replaced with "_"
    // use created keys as hash map key and push word to a value array
    for (let i = 0; i < word.length; i++) {
      // Example: hot
      //   '_ot' => [ 'hot', 'dot', 'lot' ],
      //   'h_t' => [ 'hot' ],
      //   'ho_' => [ 'hot' ],
      key = `${word.substring(0, i)}_${word.substring(i + 1)}`;
      if (graph.has(key)) {
        graph.get(key)!.push(word);
      } else {
        graph.set(key, [word]);
      }
    }
  }

  // nothing special below, usual DFS from beginWord
  let currLvlVertices: string[] = [beginWord],
    nextLvlVertices: string[] = [];

  let visited = new Set([beginWord]);

  let steps = 0;
  while (currLvlVertices.length > 0) {
    // we look for number of words, not transitions, so increment in the beginning
    steps += 1;

    for (const word of currLvlVertices) {
      if (word === endWord) {
        return steps;
      }

      for (let i = 0; i < word.length; i++) {
        // for every word generate every possible key and look up the graph
        key = `${word.substring(0, i)}_${word.substring(i + 1)}`;
        for (const nextWord of graph.get(key) ?? []) {
          if (visited.has(nextWord) === false) {
            visited.add(nextWord);
            nextLvlVertices.push(nextWord);
          }
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
  }

  return 0;
}

strictEqual(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]), 0);
