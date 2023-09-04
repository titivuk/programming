
// https://leetcode.com/problems/seat-reservation-manager/

import java.util.PriorityQueue;

class SeatManager {

    PriorityQueue<Integer> minHeap;
    int count = 1;

    public SeatManager(int n) {
        minHeap = new PriorityQueue<>(n);
    }

    public int reserve() {
        if (minHeap.size() == 0) {
            return count++;
        }

        return minHeap.remove();
    }

    public void unreserve(int seatNumber) {
        minHeap.add(seatNumber);
    }
}

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager obj = new SeatManager(n);
 * int param_1 = obj.reserve();
 * obj.unreserve(seatNumber);
 */