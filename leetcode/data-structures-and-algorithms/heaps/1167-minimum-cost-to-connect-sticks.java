import java.util.PriorityQueue;

// https://leetcode.com/problems/minimum-cost-to-connect-sticks/description/

class Solution {
    public int connectSticks(int[] sticks) {
        if (sticks.length < 2) {
            return 0;
        }

        // the minimum cost of connecting all the given sticks is achivable
        // if we always will combine smallest sticks so we use minHeap and get access to
        // the smallest sticks in O(1) time
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int stick : sticks) {
            minHeap.add(stick);
        }

        int minSum = 0;
        while (minHeap.size() > 1) {
            int newStick = minHeap.remove() + minHeap.remove();

            minSum += newStick;
            minHeap.add(newStick);
        }

        return minSum;
    }
}