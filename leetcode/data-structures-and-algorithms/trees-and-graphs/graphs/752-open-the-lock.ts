import { strictEqual } from "assert";

// https://leetcode.com/problems/open-the-lock/

function openLock(deadends: string[], target: string): number {
  let visited = new Set<string>(deadends);

  if (visited.has("0000")) {
    return -1;
  }

  const transitions: Record<string, string[]> = {
    "0": ["9", "1"],
    "1": ["0", "2"],
    "2": ["1", "3"],
    "3": ["2", "4"],
    "4": ["3", "5"],
    "5": ["4", "6"],
    "6": ["5", "7"],
    "7": ["6", "8"],
    "8": ["7", "9"],
    "9": ["8", "0"],
  };

  function prevSlot(lock: string, i: number) {
    return `${lock.slice(0, i)}${transitions[lock[i]][0]}${lock.slice(i + 1)}`;
  }

  function nextSlot(lock: string, i: number) {
    return `${lock.slice(0, i)}${transitions[lock[i]][1]}${lock.slice(i + 1)}`;
  }

  let currLvlVertices: string[] = ["0000"];
  visited.add("0000");
  let nextLvlVertices: string[] = [];

  let newLock = "";
  let steps = 0;
  while (currLvlVertices.length > 0) {
    for (const vertice of currLvlVertices) {
      if (vertice === target) {
        return steps;
      }

      // check spins for every lock wheel
      for (let i = 0; i < vertice.length; i++) {
        // spin back
        newLock = prevSlot(vertice, i);
        if (visited.has(newLock) === false) {
          visited.add(newLock);
          nextLvlVertices.push(newLock);
        }

        // spin forward
        newLock = nextSlot(vertice, i);
        if (visited.has(newLock) === false) {
          visited.add(newLock);
          nextLvlVertices.push(newLock);
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    steps += 1;
  }

  return -1;
}

strictEqual(openLock(["0201", "0101", "0102", "1212", "2002"], "0202"), 6);
