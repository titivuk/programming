// https://leetcode.com/problems/valid-palindrome-ii/?envType=list&envId=e9snhf4h

function validPalindrome(s: string): boolean {
  let left = 0,
    right = s.length - 1;

  function isPalindrome(s: string, l: number, r: number) {
    while (l < r) {
      if (s[l] !== s[r]) {
        return false;
      }

      l++;
      r--;
    }

    return true;
  }

  while (left < right) {
    // different chars found
    // we have 2 options: delete left char OR delete right char
    if (s[left] !== s[right]) {
      // check remaining substring without left char and without right char separately
      // it possible and we do not care about other chars because they've been already checked by previous iterations
      // s[left] === s[right] was true
      // example s = "cbbcc"
      // I.         c b b c c
      //            |       |
      //         left       right
      // II.        c b b c c
      //              |   |
      //           left   right
      //    a) without left char substring = 'bc' - NOT palindrome
      //    b) without right char substring = 'bb' - palindrome
      //    So if we remove right char, we get palindrome "cbbc"
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }

    left++;
    right--;
  }

  return true;
}

validPalindrome("aba");
