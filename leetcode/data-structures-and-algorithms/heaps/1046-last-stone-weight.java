
// https://leetcode.com/problems/last-stone-weight/description/

import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int lastStoneWeight(int[] stones) {
        // max heap
        PriorityQueue<Integer> heap = new PriorityQueue<>(stones.length, Collections.reverseOrder());
        for (var s : stones) {
            heap.add(s);
        }

        while (heap.size() > 1) {
            var s1 = heap.poll();
            var s2 = heap.poll();

            // not equal
            if (s1 != s2) {
                // always > 0 because s1 is bigger by max heap definition
                heap.add(s1 - s2);
            }
        }

        if (heap.size() > 0) {
            return heap.peek();
        }

        return 0;
    }
}