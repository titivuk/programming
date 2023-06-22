// https://leetcode.com/problems/reverse-only-letters/

import { strictEqual } from "assert";

function reverseOnlyLetters(s: string): string {
  let chars = s.split("");

  let left = 0,
    right = s.length - 1;

  function isEnglishCharCode(code: number) {
    return (65 <= code && code <= 90) || (97 <= code && code <= 122);
  }

  let tmp = "";
  while (left < right) {
    if (!isEnglishCharCode(s.charCodeAt(left))) {
      left += 1;
    } else if (!isEnglishCharCode(s.charCodeAt(right))) {
      right -= 1;
    } else {
      tmp = chars[left];
      chars[left] = s[right];
      chars[right] = tmp;

      left += 1;
      right -= 1;
    }
  }

  return chars.join("");
}

strictEqual(reverseOnlyLetters("ab-cd"), "dc-ba");
strictEqual(reverseOnlyLetters("a-bC-dEf-ghIj"), "j-Ih-gfE-dCba");
strictEqual(reverseOnlyLetters("Test1ng-Leet=code-Q!"), "Qedo1ct-eeLg=ntse-T!");
