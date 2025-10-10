// https://leetcode.com/problems/longest-repeating-character-replacement/description/

function characterReplacement(s: string, k: number): number {
    let answer = 0;
    // keep track of chars in the window
    let charsCounter = new Array(26).fill(0);
    // additionally, track maxCounter to avoid iterating over charsCounter
    let maxCounter = 0;
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        // count number of chars in the current window
        charsCounter[s.charCodeAt(right) - 65] += 1;
        maxCounter = Math.max(maxCounter, charsCounter[s.charCodeAt(right) - 65]);
        // if there is not a single char that can be used to create substring length of right - left + 1
        // remove leftmost char from the sliding window by moving left pointer
        // we don't need loop here, because we add and remove single one at a time
        if (right - left + 1 - maxCounter > k) {
            charsCounter[s.charCodeAt(left) - 65] -= 1;
            left++;
        }
        answer = Math.max(answer, right - left + 1);
    }
    return answer;
}