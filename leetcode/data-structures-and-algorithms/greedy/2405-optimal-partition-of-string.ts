// https://leetcode.com/problems/optimal-partition-of-string/

function partitionString(s: string): number {
  let usedChars = new Set<string>();

  let answer = 1;
  for (let ch of s) {
    // keep track of current substring chars
    // if ch is already used in the substring
    // then new substring must be created
    // so increment substring counter
    // clear set and add ch
    if (usedChars.has(ch)) {
      usedChars.clear();
      answer += 1;
    }

    usedChars.add(ch);
  }

  return answer;
}

partitionString("abacaba");
