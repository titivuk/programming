
// https://leetcode.com/problems/construct-string-with-repeat-limit/

import java.util.PriorityQueue;

class SolutionWithAnswerLookupComparator {
    public String repeatLimitedString(String s, int repeatLimit) {
        StringBuilder answer = new StringBuilder();

        // counter for every char
        int[] charsCounter = new int[26];
        for (int i = 0; i < s.length(); i++) {
            charsCounter[s.charAt(i) - 'a'] += 1;
        }

        // max heap ordered lexicographically
        PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> {
            if (answer.length() > 0) {
                if (answer.charAt(answer.length() - 1) == a) {
                    return 1;
                }

                if (answer.charAt(answer.length() - 1) == b) {
                    return -1;
                }
            }

            return (int) b - (int) a;
        });

        // add every char to max heap ONCE
        for (int i = 0; i < charsCounter.length; i++) {
            if (charsCounter[i] > 0) {
                maxHeap.add((char) (i + 'a'));
            }
        }

        while (maxHeap.size() > 0) {
            // take largest char
            char c = maxHeap.peek();
            int repeat = Math.min(repeatLimit, charsCounter[c - 'a']);

            int i = 1;
            while (i <= repeat) {
                // append largest char to the answer
                answer.append(c);

                // after "c" appended, remove it from the heap
                // heap will be reordered in case there is a larger char
                // but we could not add it before "c" because of repeatLimit
                // for example
                // answer = 'bb', repeatLimit = 2, c = 'a' and there are more 'b' available but
                // they cannot be added cuz there is sequence of 2 already
                // so in this case we need to add 2nd largest ('a') -> answer = 'bba'
                // and now 'b' has more priority than 'a' again
                if (maxHeap.size() > 0 && maxHeap.peek() == c) {
                    maxHeap.remove();
                }

                // after heap is ordered
                // we can check if new heap head larger than c
                // if so - add c only once, update repeat value and end the loop
                if (repeat > 1 && maxHeap.size() > 0 && maxHeap.peek() > c) {
                    repeat = i;
                    // end while loop
                    i = repeat + 1;
                } else {
                    i += 1;
                }
            }

            // subtract from chars counter
            charsCounter[c - 'a'] -= repeat;
            // if c is still available -> return it to the heap
            if (charsCounter[c - 'a'] > 0) {
                maxHeap.add(c);
            }

            // if the next largest char is the same as answer
            // there are not more chars that we can add to the answer from the heap
            if (maxHeap.size() > 0 && maxHeap.peek() == answer.charAt(answer.length() - 1)) {
                return answer.toString();
            }
        }

        return answer.toString();
    }
}

class Solution {
    public String repeatLimitedString(String s, int repeatLimit) {

        // counter for every char
        int[] charsCounter = new int[26];
        // max heap ordered lexicographically
        PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> b - a);

        for (int i = 0; i < s.length(); i++) {
            charsCounter[s.charAt(i) - 'a'] += 1;
        }

        // add every char to max heap ONCE
        for (int i = 0; i < charsCounter.length; i++) {
            if (charsCounter[i] > 0) {
                maxHeap.add((char) (i + 'a'));
            }
        }

        StringBuilder answer = new StringBuilder();

        int charIndex;
        char secondLargestChar;
        while (maxHeap.size() > 0) {
            char c = maxHeap.remove();
            charIndex = c - 'a';
            int repeat = Math.min(repeatLimit, charsCounter[charIndex]);

            for (int i = 0; i < repeat; i++) {
                answer.append(c);
            }
            charsCounter[charIndex] -= repeat;

            // if there are more c left
            // we need to add it as soon as possible
            // to do that we need to insert 2nd largest symbol once
            // and then insert c again
            if (charsCounter[charIndex] > 0) {

                // if there is no 2nd largest symbol left
                // we cannot add more chars to the answer
                if (maxHeap.size() == 0) {
                    return answer.toString();
                }

                secondLargestChar = maxHeap.peek();
                charIndex = secondLargestChar - 'a';
                // add the 2nd larget char once
                answer.append(secondLargestChar);
                charsCounter[charIndex] -= 1;
                // and remove it from the heap if there are no chars available
                if (charsCounter[charIndex] == 0) {
                    maxHeap.remove();
                }

                // add it back so on the next iteration it will be picked up again
                maxHeap.add(c);
            }

        }

        return answer.toString();
    }
}