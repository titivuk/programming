import { strictEqual } from "assert";

// https://leetcode.com/problems/detonate-the-maximum-bombs/description/

function maximumDetonation(bombs: number[][]): number {
  function bfs(startIndex: number): number {
    let visited = new Array(bombs.length).fill(false);

    const stack: number[] = [startIndex];
    visited[startIndex] = true;

    let currBombIndex = 0;
    let x = 0,
      y = 0,
      r = 0;
    while (stack.length > 0) {
      currBombIndex = stack.pop()!;
      [x, y, r] = bombs[currBombIndex];

      for (let i = 0; i < bombs.length; i++) {
        if (
          Math.sqrt((x - bombs[i][0]) ** 2 + (y - bombs[i][1]) ** 2) <= r &&
          visited[i] === false
        ) {
          visited[i] = true;
          stack.push(i);
        }
      }
    }

    let answer = 0;
    for (let i = 0; i < visited.length; i++) {
      if (visited[i]) answer += 1;
    }

    return answer;
  }

  let answer = 0;
  for (let i = 0; i < bombs.length; i++) {
    answer = Math.max(answer, bfs(i));
  }

  return answer;
}

strictEqual(
  maximumDetonation([
    [1, 1, 5],
    [10, 10, 5],
  ]),
  1
);
