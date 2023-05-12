const conditions = {
  3: "Fizz",
  5: "Buzz",
};

// slower
// easier to add more conditions
function fizzBuzz(n: number): string[] {
  const result: string[] = [];

  for (let i = 1; i <= n; i++) {
    result[i - 1] =
      Object.entries(conditions)
        .map(([factor, word]) =>
          i % Number.parseInt(factor, 10) === 0 ? word : ""
        )
        .join("") || i.toString();
  }

  return result;
}

function fizzBuzzWithoutArrayJoin(n: number): string[] {
  const result: string[] = [];

  let tmp = "";
  for (let i = 1; i <= n; i++) {
    Object.entries(conditions).forEach(([factor, word]) => {
      if (i % Number.parseInt(factor, 10) === 0) {
        tmp += word;
      }
    });

    result[i - 1] = tmp || i.toString();
    tmp = "";
  }

  return result;
}
