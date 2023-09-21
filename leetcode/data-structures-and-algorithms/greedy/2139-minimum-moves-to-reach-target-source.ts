// https://leetcode.com/problems/minimum-moves-to-reach-target-score/description/

function minMoves(target: number, maxDoubles: number): number {
  let answer = 0;

  // start from the target and gradually reduce the value until it becomes 1
  // stop loop if maxDoubles = 0 because it means we only can use decrement
  // in this case we can calculate number of increments as "target - 1"
  while (target !== 1 && maxDoubles > 0) {
    // when decreasing value it's clear what operation we can use
    // if target is even -> division reduce the value faster
    if (target % 2 === 0) {
      target /= 2;
      maxDoubles -= 1;
    }
    // if we can't divide - just decrement
    else {
      target -= 1;
    }

    answer += 1;
  }

  // after no divisions left, add to answer number of decrements required to reach 1
  return answer + target - 1;
}
