// https://leetcode.com/problems/find-all-anagrams-in-a-string/

function findAnagrams(s: string, p: string): number[] {
  if (s.length < p.length) {
    return [];
  }

  let pCounter = new Array(26).fill(0);
  for (let i = 0; i < p.length; i += 1) {
    pCounter[p.charCodeAt(i) - 97] += 1;
  }

  let subArrCounter = new Array(26).fill(0);

  let answer: number[] = [];

  let left = 0;
  for (let i = 0; i < s.length; i += 1) {
    subArrCounter[s.charCodeAt(i) - 97] += 1;

    if (i - left + 1 === p.length) {
      let anagram = true;
      for (let j = 0; j < 26; j++) {
        if (subArrCounter[j] !== pCounter[j]) {
          anagram = false;
          break;
        }
      }

      if (anagram) {
        answer.push(i - p.length + 1);
      }

      subArrCounter[s.charCodeAt(left) - 97] -= 1;
      left += 1;
    }
  }

  return answer;
}

findAnagrams("cbaebabacd", "abc");
