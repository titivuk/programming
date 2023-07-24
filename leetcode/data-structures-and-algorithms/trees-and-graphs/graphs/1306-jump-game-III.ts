// https://leetcode.com/problems/jump-game-iii/description/

function canReach(arr: number[], start: number): boolean {
  let visited = new Array(arr.length).fill(false);

  let currLvlVertices: number[] = [start];
  visited[start] = true;
  let nextLvlVertices: number[] = [];

  let nextVertex = 0;
  while (currLvlVertices.length > 0) {
    for (let i = 0; i < currLvlVertices.length; i++) {
      if (arr[currLvlVertices[i]] === 0) {
        return true;
      }

      nextVertex = currLvlVertices[i] + arr[currLvlVertices[i]];
      if (nextVertex < arr.length && visited[nextVertex] === false) {
        visited[nextVertex] = true;
        nextLvlVertices.push(nextVertex);
      }

      nextVertex = currLvlVertices[i] - arr[currLvlVertices[i]];
      if (nextVertex >= 0 && visited[nextVertex] === false) {
        visited[nextVertex] = true;
        nextLvlVertices.push(nextVertex);
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
  }

  return false;
}
