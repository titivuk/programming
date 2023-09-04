
// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (var n : nums) {
            minHeap.add(n);

            if (minHeap.size() > k) {
                minHeap.remove();
            }
        }

        return minHeap.peek();
    }
}