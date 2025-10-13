// https://leetcode.com/problems/course-schedule/description/

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai
  // in context of graph, we can treat it as directed edge bi -> ai
  const adjacencyList: number[][] = Array.from(
    { length: numCourses },
    () => []
  );
  for (let [a, b] of prerequisites) {
    adjacencyList[b].push(a);
  }

  // the remaining part is to check if there is cycle
  const visited: boolean[] = new Array(numCourses).fill(false);
  // cycle detection is a DFS plus stack which keeps track of nodes in **current** recursion
  const stack: boolean[] = new Array(numCourses).fill(false);

  for (let i = 0; i < numCourses; i++) {
    if (!visited[i] && isCyclic(i, adjacencyList, visited, stack)) {
      return false;
    }
  }

  return true;
}

function isCyclic(
  v: number,
  adjacencyList: number[][],
  visited: boolean[],
  stack: boolean[]
) {
  if (stack[v]) return true;
  if (visited[v]) return false;

  stack[v] = true;
  visited[v] = true;

  const children = adjacencyList[v];
  for (const ch of children) {
    if (isCyclic(ch, adjacencyList, visited, stack)) {
      return true;
    }
  }

  stack[v] = false;
}
