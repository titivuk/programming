// https://leetcode.com/problems/find-the-town-judge/

function findJudge(n: number, trust: number[][]): number {
  // vertex is judge if
  // in-degree = n - 1 (no edge to itself) and out-degree = 0

  // for every vertex
  // calculate degrees = in-digrees - out-degrees
  let degrees = new Array<number>(n + 1).fill(0);

  for (const [from, to] of trust) {
    degrees[from] -= 1;
    degrees[to] += 1;
  }

  for (let i = 1; i <= degrees.length; i++) {
    if (degrees[i] === n - 1) {
      return i;
    }
  }

  return -1;
}
