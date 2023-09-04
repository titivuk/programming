
// https://leetcode.com/problems/smallest-number-in-infinite-set/

import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;

class SmallestInfiniteSetWithSet {

    Set<Integer> removed = new HashSet<>();
    int smallest = 1;

    public SmallestInfiniteSetWithSet() {
    }

    public int popSmallest() {
        int num = smallest;

        removed.add(smallest);
        while (removed.contains(smallest)) {
            smallest += 1;
        }

        return num;
    }

    public void addBack(int num) {
        if (removed.contains(num)) {
            removed.remove(num);
            smallest = Math.min(smallest, num);
        }
    }
}

class SmallestInfiniteSetWithHeap {

    PriorityQueue<Integer> minHeap;
    int smallest;

    public SmallestInfiniteSetWithHeap() {
        smallest = 1;
        // we store only numbers that are less than "smallest"
        // in this case when we pop, we pop from minHeap first
        // and when minHeap is empty, we use smallest and increment it
        minHeap = new PriorityQueue<>();
    }

    public int popSmallest() {
        if (minHeap.size() == 0) {
            return smallest++;
        }

        return minHeap.remove();
    }

    public void addBack(int num) {
        // check for duplicates
        if (num < smallest && !minHeap.contains(num)) {
            minHeap.add(num);
        }
    }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * SmallestInfiniteSet obj = new SmallestInfiniteSet();
 * int param_1 = obj.popSmallest();
 * obj.addBack(num);
 */