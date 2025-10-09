function calPoints(operations: string[]): number {
    const stack: number[] = [];

    let sum = 0;
    let op = '';
    for (let i = 0; i < operations.length; i++) {
        op = operations[i];

        if (op === '+') {
            let b = stack.pop()!;
            let a = stack.pop()!;
            let s = a + b;
            stack.push(a, b, s);

            sum += s;
        } else if (op === 'D') {
            stack.push(stack.at(-1)! * 2)

            sum += stack.at(-1)!;
        } else if (op === 'C') {
            sum -= stack.pop()!;
        } else {
            stack.push(+op);

            sum += stack.at(-1)!;
        }
    }

    return sum;
};