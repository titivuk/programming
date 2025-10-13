// https://leetcode.com/problems/course-schedule-ii/

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adjacencyList: number[][] = Array.from(
    { length: numCourses },
    () => []
  );
  for (const [a, b] of prerequisites) {
    adjacencyList[b].push(a);
  }

  let orderedVertices: number[] = [];
  const seen = new Array(numCourses).fill(false);
  const stack = new Array(numCourses).fill(false);
  function hasCycle(v: number): boolean {
    // cycle detected
    if (stack[v]) {
      console.log("cycle detected");
      orderedVertices = [];
      return true;
    }
    if (seen[v]) return false;

    seen[v] = true;
    stack[v] = true;

    const neighbors = adjacencyList[v];
    for (const nv of neighbors) {
      if (hasCycle(nv)) {
        return true;
      }
    }

    // we should prepend actually when v's subgraph is visited
    // but since in JS we have only array (stack) we append
    // so array ends up in a reversed order
    orderedVertices.push(v);
    stack[v] = false;

    return false;
  }

  for (let v = 0; v < adjacencyList.length; v++) {
    if (!seen[v]) {
      if (hasCycle(v)) {
        break;
      }
    }
  }

  // reverse array of vertices
  let left = 0,
    right = orderedVertices.length - 1;
  let tmp = 0;
  while (left < right) {
    tmp = orderedVertices[left];
    orderedVertices[left] = orderedVertices[right];
    orderedVertices[right] = tmp;

    left++;
    right--;
  }

  return orderedVertices;
}
