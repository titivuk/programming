function* generatorFn() {
  yield "a";
  yield "b";
  yield "c";
  // won't show up in for of or iterator traverse because done = true
  return "d";
}

const generator = generatorFn();

/**
 * generator implements iterator protocol
 */
let iterationResult = generator.next();
while (!iterationResult.done) {
  console.log("iterator protocol", iterationResult.value); // a b c
  iterationResult = generator.next();
}

/**
 * generator implements iterable protocol
 */
for (const item of generatorFn()) {
  console.log("iterable protocol", item); // a b c
}

export {};
