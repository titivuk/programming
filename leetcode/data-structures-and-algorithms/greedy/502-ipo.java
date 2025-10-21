import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public int findMaximizedCapital(
        int k,
        int w,
        int[] profits,
        int[] capital
    ) {
        int n = profits.length;

        // merge both arrays into single one
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) {
            projects[i][0] = capital[i];
            projects[i][1] = profits[i];
        }
        // sort projects by required capital
        Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
            Collections.reverseOrder()
        );

        // counter to track which projects to check next
        int i = 0;
        for (int j = 0; j < k; j++) {
            // add every project profit which we can afford to max heap
            while (i < n && projects[i][0] <= w) {
                maxHeap.add(projects[i][1]);
                i += 1;
            }

            if (maxHeap.isEmpty()) {
                return w;
            }

            // on every iteration
            // when we added all the projects that we can afford having specific "w" value
            // pick the most profitable by removing max value from max heap
            w += maxHeap.remove();
        }

        return w;
    }
}
