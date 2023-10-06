
class Solution {
  public int singleNonDuplicate(int[] nums) {
      int left = 0, right = nums.length - 1, mid = 0;

      // (1) strict < to handle out of bounds exceptions
      while (left < right) {
          mid = (left + right) / 2;

          // 0 has pair with 1 0^1 = 1
          // 1 has pair with 0 1^1 = 0

          // 2 has pair with 3 2^1 = 3
          // 3 has pair with 2 3^1 = 2

          // 4 has pair with 5 4^1 = 5
          // 5 has pair with 4 5^1 = 4

          // ...
          // ...

          // XOR (^) calculates correct pair for the given mid
          // the rule can be violated if there is a integer without pair on the left side
          // in this case we go the left
          if (nums[mid] != nums[mid ^ 1]) {
              // (1) to handle out of bounds exceptions
              right = mid;
          }
          // the rule is not violated -> go to the right
          else {
              left = mid + 1;
          }
      }

      return nums[left];
  }
}