import java.util.Arrays;
import java.util.PriorityQueue;

// https://leetcode.com/problems/meeting-rooms-iii/description/

class Solution {
    public int mostBooked(int n, int[][] meetings) {

        // keep track by running meetings sorted by endTime
        PriorityQueue<long[]> runningMeetings = new PriorityQueue<>((m1, m2) -> {
            // if time is equal - order by room number
            if (m1[1] == m2[1]) {
                return Long.compare(m1[0], m2[0]);
            }

            return Long.compare(m1[1], m2[1]);
        });
        // available rooms ASC
        PriorityQueue<Integer> availableRooms = new PriorityQueue<>();
        for (int i = 0; i < n; i++) {
            availableRooms.add(i);
        }

        // keep track number of meetings happened in each room
        long[] meetingsCounter = new long[n];

        // sort meetings by startTime
        Arrays.sort(meetings, (a, b) -> a[0] - b[0]);

        for (int[] m : meetings) {
            int mStartTime = m[0];
            int mEndTime = m[1];

            // finish all running meeting that ends before or at "mStartTime"
            while (runningMeetings.size() > 0 && runningMeetings.peek()[1] <= mStartTime) {
                long[] meeting = runningMeetings.remove();
                // make room available
                availableRooms.add((int) meeting[0]);
            }

            long actualStartTime = mStartTime;
            // if there are not available rooms at "mStartTime"
            // then meeting is delayed
            // wait until closest meeting is finished
            if (availableRooms.isEmpty()) {
                long[] meeting = runningMeetings.remove();
                availableRooms.add((int) meeting[0]);

                // meeting is delayed
                actualStartTime = meeting[1];
            }

            long roomNumber = availableRooms.remove();

            meetingsCounter[(int) roomNumber] += 1;

            // run the meeting and save time when it ends
            // since meeting can be delayed actual endTime may differ
            // we calc it as actualEndTime = actualStartTime + meetingDuration =
            // actualStartTime + (mEndTime - mStartTime)
            runningMeetings.add(new long[] { roomNumber, actualStartTime + (mEndTime - mStartTime) });
        }

        // find smallest room with the highest meetings
        int room = 0;
        for (int i = 0; i < meetingsCounter.length; i++) {
            if (meetingsCounter[i] > meetingsCounter[room]) {
                room = i;
            }
        }

        return room;
    }
}