// https://leetcode.com/problems/count-number-of-rectangles-containing-each-point/

function countRectangles(rectangles: number[][], points: number[][]): number[] {
  let answer: number[] = [];

  // for every possible height [1, 100] (from problem constraints)
  // store rectangle's length with that height
  let heightToLength: number[][] = new Array(101);
  for (let i = 0; i < heightToLength.length; i++) {
    heightToLength[i] = [];
  }
  let h = 0,
    l = 0;
  for (let i = 0; i < rectangles.length; i++) {
    l = rectangles[i][0];
    h = rectangles[i][1];

    heightToLength[h].push(l);
  }
  // for every height sort length DESC to apply binary search
  for (let i = 0; i < heightToLength.length; i++) {
    heightToLength[i].sort((a, b) => b - a);
  }

  // for every point check all heights >= point.y
  let x = 0,
    y = 0;
  for (let i = 0; i < points.length; i++) {
    x = points[i][0];
    y = points[i][1];

    let totalCounter = 0;
    // skip rectangles with height < point.y
    for (let h = y; h < heightToLength.length; h++) {
      let counter = 0;

      // apply binary search since lengths are sorted DESC
      let left = 0,
        right = heightToLength[h].length - 1,
        mid = 0;

      while (left <= right) {
        mid = Math.floor((left + right) / 2);

        // since lengths are sorted DESC
        // and heightToLength[h][mid] >= x then all values before are also >= x
        // and number of lengths >= x is mid + 1
        // (since index start from 0, we need to add 1)
        // and then we move left pointer and try to find lengths >= x in the right part of the array
        // if we will find them - we will override counter
        if (heightToLength[h][mid] >= x) {
          counter = mid + 1;

          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      totalCounter += counter;
    }

    answer[i] = totalCounter;
  }

  return answer;
}

countRectangles(
  [
    [1, 2],
    [2, 3],
    [2, 5],
  ],
  [
    [2, 1],
    [1, 4],
  ]
);
