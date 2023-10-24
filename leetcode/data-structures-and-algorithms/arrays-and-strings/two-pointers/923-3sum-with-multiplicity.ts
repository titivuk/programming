// https://leetcode.com/problems/3sum-with-multiplicity/description

function threeSumMulti(arr: number[], target: number): number {
  // tracks count of two sums that we found
  let counter = new Array(301).fill(0);

  let answer = 0;

  let modulo = 1e9 + 7;
  for (let i = 0; i < arr.length; i++) {
    // all nums are positive, so we won't find counter for negative num
    // we could omit that check and use map, but array is faster
    if (target - arr[i] >= 0) {
      answer = (answer + counter[target - arr[i]]) % modulo;
    }

    // for given arr[i] create two sum with every previous value
    // and adjust counters
    for (let j = 0; j < i; j++) {
      counter[arr[j] + arr[i]] += 1;
    }
  }

  return answer;
}

threeSumMulti([1, 0, 1, 0, 2, 1, 2], 1);
