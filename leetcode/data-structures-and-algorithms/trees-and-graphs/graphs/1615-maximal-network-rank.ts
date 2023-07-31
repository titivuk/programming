// https://leetcode.com/problems/maximal-network-rank/

function maximalNetworkRank(n: number, roads: number[][]): number {
  let degrees: number[] = new Array(n).fill(0);

  let connections: boolean[][] = [];
  for (let i = 0; i < n; i++) {
    connections[i] = new Array<boolean>(n).fill(false);
  }

  for (const [a, b] of roads) {
    degrees[a] += 1;
    degrees[b] += 1;

    // track if city "a" connected with city "b" and vice versa
    connections[a][b] = true;
    connections[b][a] = true;
  }

  let answer = 0;

  // check every vertex with every vertex
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a !== b) {
        // pairRank - number of roads that are connected to the pair
        let pairRank = degrees[a] + degrees[b];
        // if pair is connected by road as well
        // then this road is counted is degrees of both cities
        // but we need to count it only once
        // so decrement pairRank
        if (connections[a][b] || connections[b][a]) {
          pairRank -= 1;
        }

        answer = Math.max(answer, pairRank);
      }
    }
  }

  return answer;
}
