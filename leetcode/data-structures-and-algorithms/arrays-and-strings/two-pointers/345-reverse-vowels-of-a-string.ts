// https://leetcode.com/problems/reverse-vowels-of-a-string/?envType=list&envId=e9snhf4h

function reverseVowels(s: string): string {
  let left = 0,
    right = s.length - 1;

  const vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];

  let sArr: string[] = s.split("");

  let tmp = "";
  while (left < right) {
    // skip non-vowels
    while (!vowels.includes(s[left])) left++;
    while (!vowels.includes(s[right])) right--;

    tmp = sArr[left];
    sArr[left] = sArr[right];
    sArr[right] = tmp;

    left++;
    right--;
  }

  return sArr.join("");
}
