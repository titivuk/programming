// https://leetcode.com/problems/generate-parentheses/description/

function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(
    curr: string[],
    openCounter: number,
    closeCounter: number
  ) {
    if (curr.length === 2 * n) {
      result.push(curr.join(""));
      return;
    }

    if (openCounter < n) {
      curr.push("(");
      backtrack(curr, openCounter + 1, closeCounter);
      curr.pop();
    }

    if (openCounter > closeCounter) {
      curr.push(")");
      backtrack(curr, openCounter, closeCounter + 1);
      curr.pop();
    }
  }

  backtrack([], 0, 0);

  return result;
}

// another more slow approach, before adding curr to result, check if curr is valid parantheses sequence
function isValid(s: string[]): boolean {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else {
      if (stack.length === 0) {
        return false;
      }

      stack.pop();

      if (s[i] !== ")") {
        return false;
      }
    }
  }

  return stack.length === 0;
}
