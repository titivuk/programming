function isPalindrome(input: string): boolean {
  const charCounter = new Map<string, number>();

  let char = "";
  for (let i = 0; i < input.length; i++) {
    char = input[i];
    if (charCounter.has(char)) {
      // nice map guard btw
      charCounter.set(char, (charCounter.get(char) as number) + 1);
    } else {
      charCounter.set(char, 1);
    }
  }

  let numberOfOdd = 0;
  for (let [, value] of charCounter) {
    if (value % 2 !== 0) {
      numberOfOdd++;
    }
  }

  return numberOfOdd <= 1;
}
