import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
                (a, b) -> a[0] - b[0]);

        // for every number from nums1
        // create pair with nums2[0]
        for (int n1 : nums1) {
            // store sum and index on the nums2 number
            minHeap.add(new int[] { n1 + nums2[0], 0 });
        }

        List<List<Integer>> answer = new ArrayList<>();

        while (k > 0 && minHeap.size() > 0) {
            // get min sum from the heap
            int[] minPair = minHeap.remove();
            int minSum = minPair[0];
            int n2Index = minPair[1];

            // add min sum to the answer
            ArrayList<Integer> pair = new ArrayList<>();
            pair.add(minSum - nums2[n2Index]);
            pair.add(nums2[n2Index]);
            answer.add(pair);

            // check next element from the nums2
            // it works because nums2 are ordered ASC
            // so we visit smallest elements first
            if (n2Index + 1 < nums2.length) {
                minHeap.add(new int[] { minSum - nums2[n2Index] + nums2[n2Index + 1], n2Index + 1 });
            }

            k -= 1;
        }

        return answer;
    }

    /**
     * @description BFS solution. class "Pair" available in leetcode runtime
     */
    public List<List<Integer>> kSmallestPairs_BFS(int[] nums1, int[] nums2, int k) {
        int rows = nums1.length,
                cols = nums2.length;

        // use min heap
        // store indicies
        // sort elements by sum ASC
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
                (a, b) -> (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));

        List<List<Integer>> answer = new ArrayList<>();
        Set<Pair<Integer, Integer>> visited = new HashSet<>();

        // start from nums1[0] and nums2[0]
        minHeap.add(new int[] { 0, 0 });
        visited.add(new Pair<Integer, Integer>(0, 0));

        while (k-- > 0 && !minHeap.isEmpty()) {
            int[] minPair = minHeap.remove();
            int i = minPair[0];
            int j = minPair[1];

            answer.add(List.of(nums1[i], nums2[j]));

            // check next element from the nums1
            // it works because nums1 and nums2 are ordered ASC
            // so we visit smallest elements first
            if (i + 1 < rows && !visited.contains(new Pair<Integer, Integer>(i + 1, j))) {
                visited.add(new Pair<Integer, Integer>(i + 1, j));
                minHeap.add(new int[] { i + 1, j });
            }

            // check next element from the nums2
            // it works because nums1 and nums2 are ordered ASC
            // so we visit smallest elements first
            if (j + 1 < cols && !visited.contains(new Pair<Integer, Integer>(i, j + 1))) {
                visited.add(new Pair<Integer, Integer>(i, j + 1));
                minHeap.add(new int[] { i, j + 1 });
            }
        }

        return answer;
    }

    /**
     * MY SUPER SLOW
     * CHECK EVERY PAIR WITH SOME OPTIMIZATION
     * BUT ANYWAY IN 15% OF SLOWEST SOLUTIONS SPEED
     */
    public List<List<Integer>> kSmallestPairs_O_square_n(int[] nums1, int[] nums2, int k) {
        PriorityQueue<ArrayList<Integer>> maxHeap = new PriorityQueue<>(
                (a, b) -> (b.get(0) + b.get(1)) - (a.get(0) + a.get(1)));

        for (int i = 0; i < nums1.length; i++) {
            // iterate over the current row in one of the cases
            // * maxHeap doesn't have "k" pairs
            // * biggest maxHeap sum greater than the 1st row element
            // i.e. if the 1st row element sum greater than the max heap sum, then all
            // element sums will are bigger than the max heap sum
            if (maxHeap.size() < k || maxHeap.peek().get(0) + maxHeap.peek().get(1) > nums1[i] + nums2[0]) {
                for (int j = 0; j < nums2.length; j++) {
                    // if heap.size() already lte "k" and biggest heap sum lte nums1[i] + nums2[j]
                    // we can skip entire row and jump on the next one
                    if (maxHeap.size() >= k && maxHeap.peek().get(0) + maxHeap.peek().get(1) <= nums1[i] + nums2[j]) {
                        break;
                    }

                    // if heap.size() less than required
                    // OR
                    // biggest heap sum greater than nums1[i] + nums2[j]
                    // then add nums1[i] + nums2[j] sum to the heap
                    if (maxHeap.size() < k || maxHeap.peek().get(0) + maxHeap.peek().get(1) > nums1[i] + nums2[j]) {
                        ArrayList<Integer> pair = new ArrayList<>(2);

                        pair.add(nums1[i]);
                        pair.add(nums2[j]);

                        maxHeap.add(pair);
                    }

                    if (maxHeap.size() > k) {
                        maxHeap.remove();
                    }
                }
            }

        }

        List<List<Integer>> list = new ArrayList<>(maxHeap);

        return list;
    }
}