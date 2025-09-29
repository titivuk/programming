function numJewelsInStones(jewels: string, stones: string): number {
  let result = 0;

  // uppercase and lowercase chars have 6 symbols between them in [91, 96] range
  // but I don't this that's a big deal, they will be all 0s
  // 26 - lower case, 26 - upper case, 6 - unused chars
  const alphabetPlus: number[] = new Array(26 + 26 + 6).fill(0);
  for (let i = 0; i < jewels.length; i++) {
    // we don't need counter so we can set just 1
    // mb we could use some lower level stuff and change bit from 0 to 1
    // but I'm too stupid to do that on the fly
    alphabetPlus[jewels.charCodeAt(i) - 65] = 1;
  }

  for (let i = 0; i < stones.length; i++) {
    if (alphabetPlus[stones.charCodeAt(i) - 65] === 1) {
      result += 1;
    }
  }

  return result;
}
