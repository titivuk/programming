// https://leetcode.com/problems/interval-list-intersections/description/

function intervalIntersection(
  firstList: number[][],
  secondList: number[][],
): number[][] {
  const result: number[][] = [];

  let a, b;
  let i = 0,
    j = 0;
  while (i < firstList.length && j < secondList.length) {
    a = firstList[i];
    b = secondList[j];

    // intersection check
    if (a[0] <= b[1] && b[0] <= a[1]) {
      result.push([Math.max(a[0], b[0]), Math.min(a[1], b[1])]);
    }

    // if a_end >= b_end, then 'a' still can be intersected with next 'b'
    // firstList =  [8, 15]
    // secondList = [8, 10] [12, 20]
    // I
    // a = [8, 15] b = [8, 10]
    // a * b = [8, 10]
    // however, 'a' has an intersection with [12, 20], so we increment 'j' and increment 'i' when the intersection is impossible
    // i.e. a_end <= b_end
    if (a[1] <= b[1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

function intervalIntersection_naive(
  firstList: number[][],
  secondList: number[][],
): number[][] {
  // merge into single list
  const singleList: number[][] = [];
  let cur1 = firstList[0];
  let cur2 = secondList[1];
  let i1 = 0,
    i2 = 0;
  while (i1 < firstList.length && i2 < secondList.length) {
    cur1 = firstList[i1];
    cur2 = secondList[i2];

    if (cur1[0] <= cur2[0]) {
      singleList.push(cur1);
      i1++;
    } else {
      singleList.push(cur2);
      i2++;
    }
  }
  // only one of 2 cases possible
  while (i1 < firstList.length) {
    singleList.push(firstList[i1]);
    i1++;
  }
  while (i2 < secondList.length) {
    singleList.push(secondList[i2]);
    i2++;
  }

  const result: number[][] = [];
  // find intersections
  let prev = singleList[0];
  for (let i = 1; i < singleList.length; i++) {
    let cur = singleList[i];
    // intersection
    if (prev[1] >= cur[0]) {
      // add intersection to the answer
      result.push([Math.max(prev[0], cur[0]), Math.min(prev[1], cur[1])]);

      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      prev = cur;
    }
  }

  return result;
}
