function* sequenceGenerator() {
  let id = 0;

  while (true) {
    yield id++;
  }
}

const generator = sequenceGenerator();

for (let i = 0; i < 10; i++) {
  console.log(generator.next().value);
}
