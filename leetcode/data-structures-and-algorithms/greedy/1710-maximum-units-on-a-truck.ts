import { strictEqual } from "assert";

function maximumUnits(boxTypes: number[][], truckSize: number): number {
  let answer = 0;

  // sort by number of units in every box DESC
  //
  boxTypes.sort((a, b) => b[1] - a[1]);

  // after sorting, boxes with most units will be added first
  let i = 0;
  while (truckSize > 0 && i < boxTypes.length) {
    // we can add either number of boxes or remainig truck space (which is less)
    let actualSize = Math.min(truckSize, boxTypes[i][0]);
    // add number of units put
    answer += actualSize * boxTypes[i][1];
    // adjust remaining track space
    truckSize -= actualSize;

    // check the next box
    i += 1;
  }

  return answer;
}

strictEqual(
  maximumUnits(
    [
      [1, 3],
      [5, 5],
      [2, 5],
      [4, 2],
      [4, 1],
      [3, 1],
      [2, 2],
      [1, 3],
      [2, 5],
      [3, 2],
    ],
    35
  ),
  3
);
