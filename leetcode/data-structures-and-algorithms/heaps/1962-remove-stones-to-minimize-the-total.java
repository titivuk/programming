import java.util.Collections;
import java.util.PriorityQueue;

// https://leetcode.com/problems/remove-stones-to-minimize-the-total/description/

class Solution {
    public int minStoneSum(int[] piles, int k) {
        // the bigger pile we reduce - the less stones remaining
        // so it's better to reduce biggest pile every time
        // for that we are going to use max heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        int stones = 0;
        for (int p : piles) {
            maxHeap.add((p));
            stones += p;
        }

        while (k > 0) {
            int biggestPile = maxHeap.remove();
            int stonesToRemove = (int) Math.floor(biggestPile / 2);

            stones -= stonesToRemove;
            maxHeap.add(biggestPile - stonesToRemove);

            k -= 1;
        }

        return stones;
    }
}