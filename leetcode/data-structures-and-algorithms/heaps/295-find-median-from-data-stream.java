// https://leetcode.com/problems/find-median-from-data-stream/

// DETAILED EXPLANATION
// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/708/heaps/4649/

import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {

    // split ordered list of integers into 2 parts:
    // * the 1st part stored as maxHeap, so we have access to the MAX value
    // * the 2nd part stored as minHeap, so we have access to the MIN value
    // also we try to keep these 2 parts equal size
    // if number of integers are odd, one of the parts will be larger by 1

    // we can find median in O(1):
    // * if number of integers is even, then we need to take max value from the 1st
    // part (that's why we use maxHeap for the 1st part) and min value from the 2nd
    // part (that's why we use minHeap for the 2nd part)
    // * else median is the value that is stored in the heap with larger size, so we
    // just peek from larger heap

    PriorityQueue<Integer> maxHeap;
    PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        // When we add to the heap, we need to make sure that the difference between the
        // heap's sizes stays the same (or within 1 if there's an odd number of
        // elements)

        // We also need to make sure that all the elements in the min heap are larger
        // than or equal to all the elements in the max heap

        // if new value is less than max value in the 1st part of the list
        // (i.e. maxHeap)
        // then add value to the 1st part
        if (maxHeap.size() > 0 && num < maxHeap.peek()) {
            maxHeap.add(num);
        }
        // otherwise add to the 2nd part of the data
        else {
            minHeap.add(num);
        }

        // for every heap make sure if sizes differ -> difference < 1
        if (minHeap.size() - maxHeap.size() > 1) {
            maxHeap.add(minHeap.remove());
        }

        // for every heap make sure if sizes differ -> difference < 1
        if (maxHeap.size() - minHeap.size() > 1) {
            minHeap.add(maxHeap.remove());
        }
    }

    public double findMedian() {
        // if number of integers is even -> take integer from each part
        if ((maxHeap.size() + minHeap.size()) % 2 == 0) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }

        // if number of intergers is odd -> median is a single integer -> take it from
        // the largest heap
        return minHeap.size() > maxHeap.size() ? minHeap.peek() : maxHeap.peek();
    }
}

// LEEETCODE appproach, but slower
// my approach ~98% faster
// this aproch ~66% faster
class MedianFinder_LeetCode {

    PriorityQueue<Integer> maxHeap;
    PriorityQueue<Integer> minHeap;

    public MedianFinder_LeetCode() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        // It doesn't matter which heap we choose to store the median in when there's an
        // odd number - let's arbitrarily choose the max heap.

        // 1. Push num onto the max heap (as mentioned above we arbitrarily chose the
        // max
        // heap).
        // 2. Pop from the max heap, and push that element onto the min heap.
        // 3. After step 2, if the min heap has more elements than the max heap, pop
        // from
        // the min heap and push the result onto the max heap.

        maxHeap.add(num);
        minHeap.add(maxHeap.remove());
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.add(minHeap.remove());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }

        return (minHeap.peek() + maxHeap.peek()) / 2.0;
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */