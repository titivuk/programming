// https://leetcode.com/problems/maximum-split-of-positive-even-integers/submissions/

function maximumEvenSplit(finalSum: number): number[] {
  // odd numbers can't be split
  if (finalSum % 2 !== 0) {
    return [];
  }

  // start from the smallest even number
  let currEven = 2;

  let split: number[] = [];
  while (finalSum - currEven >= 0) {
    // we can use currEven value in two cases
    // 1. finalSum - currEven === 0 - which means it's the last even number that we need
    // 2. finalSum - currEven > currEven - which means if we use currEven we have to make sure that the next even number can be used
    //                                     because previous even numbers already have been used
    if (finalSum - currEven === 0 || finalSum - currEven > currEven) {
      split.push(currEven);
      finalSum -= currEven;
    }

    currEven += 2;
  }

  return split;
}

function maximumEvenSplit_addRemainingValueToLastElement(
  finalSum: number
): number[] {
  // odd numbers can't be split
  if (finalSum % 2 !== 0) {
    return [];
  }

  // start from the smallest even number
  let currEven = 2,
    currSum = 0;
  let split: number[] = [];

  // add value until currEven won't be too big to add it
  while (currSum + currEven <= finalSum) {
    split.push(currEven);

    currSum += currEven;
    currEven += 2;
  }

  // add the difference to the last element to make the sum of the elements equal to finalSum
  split[split.length - 1] += finalSum - currSum;

  return split;
}
