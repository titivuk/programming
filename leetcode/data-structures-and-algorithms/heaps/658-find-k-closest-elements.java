
// https://leetcode.com/problems/find-k-closest-elements/

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        // use order comparator which orders nums by distance from "x"
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((n1, n2) -> {
            int n2Distance = Math.abs(x - n2);
            int n1Distance = Math.abs(x - n1);

            // if distance if the same priortize smaller value (from requirements)
            if (n1Distance == n2Distance) {
                return n2 - n1;
            }

            return n2Distance - n1Distance;
        });

        for (var num : arr) {
            maxHeap.add(num);

            if (maxHeap.size() > k) {
                // remove the element that most distant from the "x"
                maxHeap.remove();
            }
        }

        List<Integer> ans = new ArrayList<Integer>();

        for (int i = 0; i < k; i++) {
            ans.add(maxHeap.remove());
        }

        ans.sort((a, b) -> a - b);

        return ans;
    }
}