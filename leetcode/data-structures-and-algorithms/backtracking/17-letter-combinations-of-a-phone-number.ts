// https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

function letterCombinations(digits: string): string[] {
  if (digits.length < 1) {
    return [];
  }

  const digits2Letters: Record<string, string> = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };
  const result: string[] = [];

  function backtrack(curr: string[], index: number) {
    if (curr.length === digits.length) {
      result.push(curr.join(""));
      return;
    }

    for (let i = index; i < digits.length; i++) {
      const mapping = digits2Letters[digits[i]];

      for (let j = 0; j < mapping.length; j++) {
        curr.push(mapping[j]);
        backtrack(curr, i + 1);
        curr.pop();
      }
    }
  }

  backtrack([], 0);

  return result;
}
