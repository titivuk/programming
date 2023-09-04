import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

// https://leetcode.com/problems/top-k-frequent-words/

class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        // count frequency of each element
        Map<String, Integer> frequencies = new HashMap<>();
        for (var w : words) {
            frequencies.put(w, frequencies.getOrDefault(w, 0) + 1);
        }

        PriorityQueue<String> minHeap = new PriorityQueue<>(
                (String a, String b) -> {
                    int aFreq = frequencies.get(a),
                            bFreq = frequencies.get(b);

                    if (aFreq == bFreq) {
                        return a.compareTo(b);
                    }

                    return aFreq - bFreq;
                });

        for (var w : frequencies.keySet()) {
            minHeap.add(w);

            if (minHeap.size() > k) {
                minHeap.remove();
            }
        }

        List<String> result = new ArrayList<String>(k);
        while (minHeap.size() > 0) {
            result.add(minHeap.poll());
        }
        Collections.reverse(result);

        return result;
    }
}