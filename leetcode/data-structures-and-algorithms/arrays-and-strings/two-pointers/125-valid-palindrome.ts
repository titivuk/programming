function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (!isAlphanum(s[left])) {
      left++;
    } else if (!isAlphanum(s[right])) {
      right--;
    } else if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    } else {
      left++;
      right--;
    }
  }

  return true;
}

function isAlphanum(char: string) {
  return (
    (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) ||
    (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) ||
    (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57)
  );
}
