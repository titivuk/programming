
// https://leetcode.com/problems/minimum-operations-to-halve-array-sum/

import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int halveArray(int[] nums) {
        // the bigger number we reduce - the less sum becomes
        // so it's better to reduce biggest number every time
        // for that we are going to use max heap
        var heap = new PriorityQueue<Double>(nums.length, Collections.reverseOrder());
        double sum = 0;
        for (var s : nums) {
            heap.add(((double) s));
            sum += s;
        }

        double currSum = sum,
                halfSum = sum / 2;
        int steps = 0;
        while (currSum > halfSum) {
            double halfOfBiggest = heap.poll() / 2;

            heap.add(halfOfBiggest);
            currSum -= halfOfBiggest;

            steps += 1;

        }

        return steps;
    }
}
