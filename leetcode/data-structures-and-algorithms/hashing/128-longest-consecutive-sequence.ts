function longestConsecutiveSort(nums: number[]): number {
  // O(nlogn) time
  nums.sort((a, b) => a - b);

  let maxLen = 0;
  let i = 0;
  while (i < nums.length) {
    let j = i + 1;
    let len = 1;
    while (
      j < nums.length &&
      (nums[j - 1] + 1 === nums[j] || nums[j - 1] === nums[j])
    ) {
      if (nums[j - 1] + 1 === nums[j]) {
        len++;
      }

      j++;
    }

    if (maxLen < len) {
      maxLen = len;
    }

    i = j;
  }

  return maxLen;
}

function longestConsecutive(nums: number[]): number {
  // 0(n) time
  const uniqueNums = new Set(nums);

  let maxLen = 0;
  for (const num of uniqueNums) {
    // if there is no (num - 1), then num is start of the sequence
    if (!uniqueNums.has(num - 1)) {
      let next = num;
      while (uniqueNums.has(next + 1)) {
        next++;
      }

      let len = next - num + 1;
      if (maxLen < len) {
        maxLen = len;
      }
    }
  }

  return maxLen;
}
