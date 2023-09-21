import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int largestSumAfterKNegations(int[] nums, int k) {
    // use min heap to get smallest number on every iteration 
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    // calculate sum before any changes
    int sum = 0;
    for(int n: nums) {
      minHeap.add(n);
      sum += n;
    }


    for (int i = 0; i < k; i++) {
      int min = minHeap.remove();
      minHeap.add(-min);

      // on every change adjust sum to avoid iteration over the array again
      sum -= 2 * min;
    }

    return sum;
  }
}