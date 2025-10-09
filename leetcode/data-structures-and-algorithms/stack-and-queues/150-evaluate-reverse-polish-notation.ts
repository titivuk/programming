function evalRPN(tokens: string[]): number {
    const stack: string[] = [];

    let token = '';
    for (let i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (token === '+') {
            let b = stack.pop()!;
            let a = stack.pop()!;

            stack.push(((+a) + (+b)).toString(10));
        } else if (token === '-') {
            let b = stack.pop()!;
            let a = stack.pop()!;

            stack.push(((+a) - (+b)).toString(10));
        } else if (token === '*') {
            let b = stack.pop()!;
            let a = stack.pop()!;

            stack.push(((+a) * (+b)).toString(10));
        } else if (token === '/') {
            let b = stack.pop()!;
            let a = stack.pop()!;

            stack.push(Math.trunc((+a) / (+b)).toString(10));
        } else {
            stack.push(token);
        }
    }

    return +stack.at(-1)!;
};