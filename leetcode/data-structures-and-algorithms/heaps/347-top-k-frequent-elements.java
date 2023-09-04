// https://leetcode.com/problems/top-k-frequent-elements/

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // count frequency of each element
        Map<Integer, Integer> frequencies = new HashMap<>();
        for (int num : nums) {
            frequencies.put(num, frequencies.getOrDefault(num, 0) + 1);
        }

        // use order comparator which orders nums by frequencies
        PriorityQueue<Integer> minHeap = new PriorityQueue<>((n1, n2) -> frequencies.get(n1) - frequencies.get(n2));
        for (var key : frequencies.keySet()) {
            minHeap.add(key);

            // start removing smallest value from the heap when size exceeds k elements
            if (minHeap.size() > k) {
                minHeap.remove();
            }
        }

        int[] ans = new int[k];
        for (int i = 0; i < k; i++) {
            ans[i] = minHeap.remove();
        }

        return ans;
    }
}