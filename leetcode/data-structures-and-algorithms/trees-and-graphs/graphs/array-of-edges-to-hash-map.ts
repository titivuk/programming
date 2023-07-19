function buildGraph(edges: Array<[number, number]>): Map<number, number[]> {
  const graphMap = new Map<number, number[]>();

  for (const [x, y] of edges) {
    if (!graphMap.has(x)) {
      graphMap.set(x, []);
    }

    graphMap.get(x)?.push(y);

    // if graph is undirected

    // if (!graphMap.has(y)) {
    //   graphMap.set(y, []);
    // }

    // graphMap.get(y)?.push(x);
  }

  return graphMap;
}
