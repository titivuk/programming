import { strictEqual } from "assert";

// https://leetcode.com/problems/path-crossing/

// Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively.
// You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

// Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited.
// Return false otherwise.

function isPathCrossing(path: string): boolean {
  const visitedPoints = new Set<string>(["0:0"]);

  let setKey = "";
  let x = 0,
    y = 0;
  for (let i = 0; i < path.length; i++) {
    // calc next point
    switch (path[i].toUpperCase()) {
      case "N":
        y += 1;
        break;
      case "S":
        y -= 1;
        break;
      case "E":
        x += 1;
        break;
      case "W":
        x -= 1;
        break;
      default:
        break;
    }

    setKey = `${x}:${y}`;

    if (visitedPoints.has(setKey)) {
      return true;
    }

    visitedPoints.add(setKey);
  }

  return false;
}

strictEqual(isPathCrossing("nes"), false);
strictEqual(isPathCrossing("NESWW"), true);
