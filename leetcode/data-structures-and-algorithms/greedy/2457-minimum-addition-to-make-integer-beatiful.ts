function makeIntegerBeautiful(n: number, target: number): number {
  function calcDigitsSum(num: number) {
    let sum = 0;

    while (num > 0) {
      //split last digit from number
      sum += num % 10;

      // divide num by 10. num /= 10 also a valid one
      num = Math.floor(num / 10);
    }

    return sum;
  }

  let digitsSum = calcDigitsSum(n);
  let steps = 0;
  let toAdd = 0;

  // starts from 1 from the end of the digit
  let digitNumber = 1;
  while (digitsSum > target) {
    // calculate what number should be added to "n" in order to get 0 on the digitNumber position
    // i.e. for 169, toAdd = 1; for 180, toAdd = 20
    toAdd = 10 ** digitNumber - (n % 10 ** digitNumber);

    n += toAdd;

    digitsSum = calcDigitsSum(n);

    digitNumber += 1;
    steps += toAdd;
  }

  return steps;
}

makeIntegerBeautiful(19, 1);
