function fizzBuzz(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    result[i - 1] = "";

    if (i % 3 === 0) {
      result[i - 1] += "Fizz";
    }

    if (i % 5 === 0) {
      result[i - 1] += "Buzz";
    }

    if (result[i - 1] === "") {
      result[i - 1] = i.toString();
    }
  }

  return result;
}
