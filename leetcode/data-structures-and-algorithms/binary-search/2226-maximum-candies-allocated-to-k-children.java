// https://leetcode.com/problems/maximum-candies-allocated-to-k-children/

class Solution {

  public int maximumCandies(int[] candies, long k) {
    long sumCandies = 0;
    for (int i = 0; i < candies.length; ++i) {
      sumCandies += candies[i];
    }

    long left = 0,
        right = sumCandies / k,
        mid = 0;

    while (left < right) {
      mid = (left + right + 1) / 2;

      long sum = 0;
      for (int i = 0; i < candies.length; ++i) {
        sum += candies[i] / mid;
      }

      if (sum >= k) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return (int) right;
  }
}