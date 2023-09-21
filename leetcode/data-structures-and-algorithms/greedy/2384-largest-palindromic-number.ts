// https://leetcode.com/problems/largest-palindromic-number/

function largestPalindromic(num: string): string {
  // time - 0(n)
  // even though we sort array, it's size always 10 (for every digits in [0, 9])

  // calculate frequency of every digit and put the digit into the array as well
  // we will sort that array by the digit value
  let frequency: Array<[number, number]> = [];
  for (let i = 0; i < 10; i++) {
    frequency[i] = [i, 0];
  }
  for (let n of num) {
    frequency[+n][1] += 1;
  }

  // we take every even number and use largest first
  // to achieve largest integer, largest digits should go first
  frequency.sort((a, b) => b[0] - a[0]);

  // we track only left part of the palindrome
  // it's enough because we can mirror and get the right part
  let palindromeLeftPart: number[] = [];
  // we can take only one number with odd frequency - the max one
  let middleValue = Number.NEGATIVE_INFINITY;
  let digitsToAdd = 0;
  for (const [digit, count] of frequency) {
    digitsToAdd = Math.floor(count / 2);

    for (let i = 0; i < digitsToAdd; i++) {
      palindromeLeftPart.push(digit);
    }

    // if there is unused digit frequency left (for example, we could use 2 out of 3)
    // store that digit if it's larger that the one we currently have
    if (count - digitsToAdd * 2 > 0) {
      middleValue = Math.max(middleValue, digit);
    }
  }

  // remove leading zeroes
  let i = 0;
  while (palindromeLeftPart[i] === 0) {
    i += 1;
  }
  let palindromeLeftPartWithoutLeadingZeroes = palindromeLeftPart.slice(i);

  // if there is nothing left after we removed leading zeroes
  // return only odd digit or 0 if there is no odd digit
  if (palindromeLeftPartWithoutLeadingZeroes.length === 0) {
    return middleValue === Number.NEGATIVE_INFINITY ? "0" : middleValue.toString();
  }

  // "glue" palindrome by mirroring its left part and add digit in the middle if it exists
  return (
    palindromeLeftPartWithoutLeadingZeroes.join("") +
    (middleValue === Number.NEGATIVE_INFINITY ? "" : middleValue) +
    palindromeLeftPartWithoutLeadingZeroes.reverse().join("")
  );
}

function largestPalindromicV2(num: string): string {
  // time - 0(n)

  // calculate frequency of every digit and put the digit into the array as well
  // we will sort that array by the digit value
  let frequency: number[] = new Array(10).fill(0);
  for (let n of num) {
    frequency[+n] += 1;
  }

  let leftPart: number[] = [];
  let middleValue = Number.NEGATIVE_INFINITY;
  let digitsToAdd = 0;

  /**
   * @description
   * Exactly the same approch as the version above
   * but instead of sorting array of size 10
   * we iterate over [9, 0] range
   */
  for (let i = 9; i >= 0; i -= 1) {
    // if there are no digits except zeroes - do not add zeroes
    if (i === 0 && leftPart.length === 0) {
      middleValue = Math.max(middleValue, i);
      break;
    }

    // add digits to the left part
    digitsToAdd = Math.floor(frequency[i] / 2);
    for (let j = 0; j < digitsToAdd; j++) {
      leftPart.push(i);
    }

    // check if value can be used as middlePart
    if (frequency[i] - digitsToAdd * 2 > 0) {
      middleValue = Math.max(middleValue, i);
    }
  }

  // calculate middle value or set empty string
  let middleValueStr: string =
    middleValue === Number.NEGATIVE_INFINITY ? "" : middleValue.toString();

  // "glue" palindrome by mirroring its left part and add digit in the middle if it exists
  return leftPart.join("") + middleValueStr + leftPart.reverse().join("");
}

largestPalindromic("5736732");
