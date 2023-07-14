import { strictEqual } from "assert";

class MinStack {
  // store val together with min value for each element
  stack: { val: number; min: number }[] = [];

  push(val: number): void {
    this.stack.push({
      val,
      min: Math.min(val, this.stack.at(-1)?.min ?? val),
    });
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number | undefined {
    return this.stack.at(-1)?.val;
  }

  getMin(): number | undefined {
    return this.stack.at(-1)?.min;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const s = new MinStack();

s.push(-2);
s.push(0);
s.push(-3);
strictEqual(s.getMin(), -3);
s.pop();
strictEqual(s.top(), 0);
strictEqual(s.getMin(), -2);
