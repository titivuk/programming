import { strictEqual } from "assert";

// You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi.
// Return the destination city, that is, the city without any path outgoing to another city.

// It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city

function destCity(paths: string[][]): string {
  const destCities = new Set<string>();
  for (let i = 0; i < paths.length; i++) {
    destCities.add(paths[i][1]);
  }

  for (let i = 0; i < paths.length; i++) {
    destCities.delete(paths[i][0]);
  }

  // return 1st element of set
  return destCities.values().next().value;
}

strictEqual(
  destCity([
    ["London", "New York"],
    ["New York", "Lima"],
    ["Lima", "Sao Paulo"],
  ]),
  "Sao Paulo"
);

strictEqual(
  destCity([
    ["B", "C"],
    ["D", "B"],
    ["C", "A"],
  ]),
  "A"
);

strictEqual(destCity([["A", "Z"]]), "Z");
