// You are given a binary substring s (a string containing only "0" and "1").
// You may choose up to one "0" and flip it to a "1".
// What is the length of the longest substring achievable that contains only "1"?

// For example, given s = "1101100111", the answer is 5.
// If you perform the flip at index 2, the string becomes 1111100111.

function findMaxLength(str: string) {
  let result = 0;

  let zeroes = 0;

  let left = 0;
  for (let right = 0; right < str.length; right++) {
    if (str.charAt(right) === "0") {
      zeroes += 1;
    }

    while (zeroes > 1) {
      if (str.charAt(left) === "0") {
        zeroes -= 1;
      }

      left += 1;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

console.log(findMaxLength("1101100111"));
