// https://leetcode.com/problems/reverse-words-in-a-string/

function reverseWords(s: string): string {
  let right = s.length - 1;

  let answer: string[] = [];

  for (let left = s.length - 1; left >= 0; left--) {
    if (s[left] === " ") {
      for (let i = left + 1; i <= right; i++) {
        answer.push(s[i]);
      }

      // skip multiple whitespaces
      while (s[left] === " ") {
        left--;
      }

      if (
        left >= 0 &&
        answer[answer.length - 1] &&
        answer[answer.length - 1] !== " "
      ) {
        answer.push(" ");
      }

      right = left;
    }
  }

  for (let i = 0; i <= right; i++) {
    if (s[i] !== " ") {
      answer.push(s[i]);
    }
  }

  return answer.join("");
}

reverseWords("  hello  world  ");
reverseWords("the sky is blue");
