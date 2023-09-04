// https://leetcode.com/problems/total-cost-to-hire-k-workers/

import java.util.PriorityQueue;

class Solution {
    public long totalCost(int[] costs, int k, int candidates) {
        PriorityQueue<Integer> leftMinHeap = new PriorityQueue<>();
        PriorityQueue<Integer> rightMinHeap = new PriorityQueue<>();

        int nextLeft = 0;
        int nextRight = costs.length - 1;

        // fill left with workers first
        while (nextLeft < candidates) {
            leftMinHeap.add(costs[nextLeft++]);
        }

        // fill right with workers
        // there can be less workers remaining than candidates
        // if costs.length < candidates * 2
        // so make sure we don't add the same workers into both parts
        for (int i = 0; i < Math.min(candidates, costs.length - nextLeft); i++) {
            rightMinHeap.add(costs[nextRight--]);
        }

        long totalCost = 0;

        // take "k" workers with the lowest cost on every iteration
        for (int i = 0; i < k; i++) {
            // if
            // * there is no workers in the right side OR
            // * there are at least 1 worker in the both sides and the left one is cheaper
            // (or equal)
            // then hire the left one
            if (rightMinHeap.size() == 0 || leftMinHeap.size() > 0 && leftMinHeap.peek() <= rightMinHeap.peek()) {
                totalCost += leftMinHeap.remove();

                // add next worker to the left group if he's not taken yet by the right group
                if (nextLeft <= nextRight) {
                    leftMinHeap.add(costs[nextLeft++]);
                }

            }
            // otherwise hire the right one
            else {
                totalCost += rightMinHeap.remove();

                // add next worker to the right group if he's not taken yet by the left group
                if (nextRight >= nextLeft) {
                    rightMinHeap.add(costs[nextRight--]);
                }
            }

        }

        return totalCost;

    }
}