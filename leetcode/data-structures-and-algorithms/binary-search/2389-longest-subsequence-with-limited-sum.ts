// https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/

function answerQueries(nums: number[], queries: number[]): number[] {
  let answer: number[] = new Array(queries.length).fill(0);

  // for longest subsequence choose smallest elements
  nums.sort((a, b) => a - b);

  // calculate prefix sum for the elements
  let prefixSum: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  // for every query[i] find the index of lte prefix sum using binary search
  for (let i = 0; i < queries.length; i++) {
    let target = queries[i];
    let left = 0,
      right = prefixSum.length - 1;

    let mid = 0;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (target >= prefixSum[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // left points to last lte prefix sum
    answer[i] = left;
  }

  return answer;
}

answerQueries([4, 5, 2, 1], [3, 10, 21]);
