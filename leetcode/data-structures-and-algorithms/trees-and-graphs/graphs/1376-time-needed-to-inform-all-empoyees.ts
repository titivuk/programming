// https://leetcode.com/problems/time-needed-to-inform-all-employees/

function numOfMinutesBFS(
  n: number,
  headID: number,
  manager: number[],
  informTime: number[]
): number {
  let graph: number[][] = [];
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // build graph where employee's manager also it's parent
  // manager -> employee
  for (let i = 0; i < manager.length; i++) {
    if (i !== headID) {
      graph[manager[i]].push(i);
    }
  }

  // for every vertex calculate total time required to be informed
  let totalInformTime = new Array<number>(n).fill(0);

  // start from head
  let currLvlVertices: number[] = [headID],
    nextLvlVertices: number[] = [];

  while (currLvlVertices.length > 0) {
    for (const vertex of currLvlVertices) {
      for (const neighbor of graph[vertex]) {
        // employee total inform time equals to total inform time of the manager + manager inform time
        // in other words employeeTime = totalManagerTime + managerTime
        totalInformTime[neighbor] =
          informTime[vertex] + totalInformTime[vertex];

        nextLvlVertices.push(neighbor);
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
  }

  // return max time required to inform any employee
  return Math.max(...totalInformTime);
}

function numOfMinutesDFS(
  n: number,
  headID: number,
  manager: number[],
  informTime: number[]
): number {
  let graph: number[][] = [];
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (let i = 0; i < manager.length; i++) {
    if (i !== headID) {
      graph[manager[i]].push(i);
    }
  }

  // postorder DFS
  // we go to the leafs and move up calculating maximum informTime
  function dfs(vertex: number, parentTime: number): number {
    // if it's a leaf - parentTime minutes required to inform that leaf
    if (graph[vertex].length === 0) {
      return parentTime;
    }

    let maxNeighborTime = 0;
    for (const neighbor of graph[vertex]) {
      // find max informTime among all neighbors from the same parent
      maxNeighborTime = Math.max(
        maxNeighborTime,
        // check children first
        dfs(neighbor, parentTime + informTime[vertex])
      );
    }

    return maxNeighborTime;
  }

  // start from head
  // 0 time required to inform head
  return dfs(headID, 0);
}

numOfMinutesBFS(
  11,
  4,
  [5, 9, 6, 10, -1, 8, 9, 1, 9, 3, 4],
  [0, 213, 0, 253, 686, 170, 975, 0, 261, 309, 337]
);
