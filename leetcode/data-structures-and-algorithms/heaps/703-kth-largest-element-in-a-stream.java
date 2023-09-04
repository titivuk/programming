import java.util.PriorityQueue;

// https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

class KthLargest {

    int k;
    PriorityQueue<Integer> minHeap;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        minHeap = new PriorityQueue<>();

        for (int i : nums) {
            minHeap.add(i);
        }

        while (minHeap.size() > k) {
            minHeap.remove();
        }
    }

    public int add(int val) {
        minHeap.add(val);

        if (minHeap.size() > k) {
            minHeap.remove();
        }

        return minHeap.peek();
    }
}
