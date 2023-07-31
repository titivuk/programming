// https://leetcode.com/problems/possible-bipartition/

function possibleBipartition(n: number, dislikes: number[][]): boolean {
  let graph: number[][] = [];

  for (let i = 0; i < n + 1; i++) {
    graph[i] = [];
  }

  for (const [x, y] of dislikes) {
    graph[x].push(y);
    graph[y].push(x);
  }

  // GREEN and BLUE represents groups
  // it's coloring graph problem where number of colors = 2
  let GREEN = 1,
    BLUE = -1,
    NO_COLOR = 0;

  let colors: number[] = new Array(n + 1).fill(NO_COLOR);

  function draw(vertex: number, color: number) {
    colors[vertex] = color;

    for (const neighbor of graph[vertex]) {
      // if neighbor is colored in the same way as current vertex
      // it's not possible to put them in the separate groups
      if (colors[neighbor] === color) {
        return false;
      }

      // if neighbor is not yet colored - try to color it and its children
      if (colors[neighbor] === NO_COLOR) {
        // this solution looks better because there are only 2 colors
        // so we can mark color#1 = x and color#2 = -x and alternate values
        if (draw(neighbor, -color) === false) {
          return false;
        }
      }
    }

    // all children and their children were colored
    return true;
  }

  for (let i = 1; i < graph.length; i++) {
    // start from any color, BLUE in our case
    // we can freely chose any color because if there is would be a neighbor with choosen color
    // then current vertex would be colored as well
    if (colors[i] === NO_COLOR && draw(i, BLUE) === false) {
      return false;
    }
  }

  return true;
}

function possibleBipartition_MY_SOLUTION(
  n: number,
  dislikes: number[][]
): boolean {
  let graph: number[][] = [];
  for (let i = 0; i < n + 1; i++) {
    graph[i] = [];
  }
  for (const [x, y] of dislikes) {
    graph[x].push(y);
    graph[y].push(x);
  }

  let RED = -1,
    BLACK = 1,
    NO_COLOR = 0;

  let colors: number[] = new Array(n + 1).fill(NO_COLOR);

  function dfs(vertex: number, colors: number[]) {
    let possibleColors = new Set([RED, BLACK]);
    for (const neighbor of graph[vertex]) {
      // remove colors that used by neighbors
      possibleColors.delete(colors[neighbor]);
    }

    // we can't color vertex in any way
    if (possibleColors.size === 0) {
      return false;
    }

    // use random color that's not used by neighbors
    let vertexColor = [...possibleColors][0];
    colors[vertex] = vertexColor;

    for (const neighbor of graph[vertex]) {
      // check every neighbor that are not yet colored
      // and if it cannot be colored (by false return value)
      // that return false immideately
      if (colors[neighbor] === NO_COLOR && dfs(neighbor, colors) === false) {
        return false;
      }
    }

    // every neighbor and children can be colored
    return true;
  }

  for (let i = 1; i < graph.length; i++) {
    if (colors[i] === NO_COLOR && dfs(i, colors) === false) {
      return false;
    }
  }

  return true;
}
