// https://leetcode.com/problems/minimum-genetic-mutation/description/

function minMutation(
  startGene: string,
  endGene: string,
  bank: string[]
): number {
  const bankSet = new Set(bank);
  const geneChars = ["A", "C", "G", "T"];
  function getNeighbors(vertex: string) {
    const neighbors: string[] = [];

    let gene = "";
    for (let i = 0; i < vertex.length; i++) {
      for (const char of geneChars) {
        gene = `${vertex.slice(0, i)}${char}${vertex.slice(i + 1)}`;
        // add only valid genes (ones that exist in the bank)
        if (bankSet.has(gene)) {
          neighbors.push(gene);
        }
      }
    }
    return neighbors;
  }

  let currLvlVertices: string[] = [startGene];
  let nextLvlVertices: string[] = [];
  let visited = new Set([startGene]);
  let steps = 0;
  while (currLvlVertices.length > 0) {
    for (const gene of currLvlVertices) {
      // if endGene found - return number of steps taken
      if (gene === endGene) {
        return steps;
      }

      // for every gene get list of valid neighbor genes
      for (const neighbor of getNeighbors(gene)) {
        if (visited.has(neighbor) === false) {
          visited.add(neighbor);
          nextLvlVertices.push(neighbor);
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    steps += 1;
  }

  return -1;
}
