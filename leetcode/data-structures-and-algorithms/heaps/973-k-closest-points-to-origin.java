
// https://leetcode.com/problems/k-closest-points-to-origin/description/

import java.util.Comparator;
import java.util.PriorityQueue;

class Solution {
    public int[][] kClosest(int[][] points, int k) {

        PriorityQueue<int[]> minHeap = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                return (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1]);
            }
        });

        for (int[] p : points) {
            minHeap.add(p);

            if (minHeap.size() > k) {
                minHeap.remove();
            }
        }

        return minHeap.toArray(new int[0][0]);
    }
}