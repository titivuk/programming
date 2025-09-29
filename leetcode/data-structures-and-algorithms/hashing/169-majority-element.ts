function majorityElement(nums: number[]): number {
  // linear time and 0(n) space
  const n = nums.length;
  const counter = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    counter.set(nums[i], (counter.get(nums[i]) ?? 0) + 1);
  }

  for (const [num, count] of counter) {
    if (count > n / 2) {
      return num;
    }
  }

  return -1;
}
