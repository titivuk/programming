import { deepStrictEqual } from "assert";
import { SinglyListNode } from "../linked-lists/singly-linked-list.js";

// https://leetcode.com/problems/implement-queue-using-stacks/

// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

// Implement the MyQueue class:

// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.
// Notes:

// You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

/**
 * @description push O(n) - may be even worse since I'm using array.shift() on every iteration
 * everything else - O(1) (considering shift() is O(1) which is not I'm almost sure)
 */
class MyStackSingleQueue {
  queue: number[] = [];

  push(x: number): void {
    this.queue.push(x);

    // (i < this.queue.length - 1) because last element = x
    // and we want to keep it in the front of the queue
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift() as number);
    }
  }

  pop(): number | undefined {
    return this.queue.shift();
  }

  top(): number {
    return this.queue[0];
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}

class MyStackSingleQueueLinkedList {
  queueHead: SinglyListNode | null = null;
  // keep tail for O(1) push to the back
  queueTail: SinglyListNode | null = null;

  push(x: number): void {
    const newNode = new SinglyListNode(x);

    // if there is no items in the linked list
    if (!this.queueHead || !this.queueTail) {
      this.queueHead = newNode;
      this.queueTail = newNode;
    } else {
      // if we have list 1 -> 2 -> 3 -> 4
      // first, we add new element to the back: 1 -> 2 -> 3 -> 4 -> 5
      // then, we remove elements starting from head until new element and push them to the back
      // 2 -> 3 -> 4 -> 5 -> 1
      // 3 -> 4 -> 5 -> 1 -> 2
      // ...
      // 5 -> 1 -> 2 -> 3 -> 4

      // push node to the back of the queue
      this.queueTail.next = newNode;
      this.queueTail = newNode;

      let curr = this.queueHead;
      // push to the back until newNode met
      while (curr !== newNode) {
        // push every element starting from head to tail
        this.queueTail!.next = curr;
        this.queueTail = this.queueTail.next;
        
        curr = curr.next!;
        
        this.queueTail.next = null;
      }

      // set head as new node
      this.queueHead = newNode;
    }
  }

  pop(): number | undefined {
    const val = this.queueHead?.val;

    if (this.queueHead) {
      this.queueHead = this.queueHead.next;
      this.queueTail = this.queueHead?.next ?? this.queueHead;
    }

    return val;
  }

  top(): number | undefined {
    return this.queueHead?.val;
  }

  empty(): boolean {
    return !this.queueHead;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

const s = new MyStackSingleQueue();

s.push(1);
deepStrictEqual(s.queue, [1]);
s.push(2);
deepStrictEqual(s.queue, [2, 1]);
deepStrictEqual(s.top(), 2);
deepStrictEqual(s.pop(), 2);
deepStrictEqual(s.top(), 1);
deepStrictEqual(s.empty(), false);

const sLinkedList = new MyStackSingleQueueLinkedList();

sLinkedList.push(1);
sLinkedList.push(2);
deepStrictEqual(sLinkedList.top(), 2);
sLinkedList.push(3);
sLinkedList.push(4);
deepStrictEqual(sLinkedList.top(), 4);
deepStrictEqual(sLinkedList.pop(), 4);
deepStrictEqual(sLinkedList.pop(), 3);
deepStrictEqual(sLinkedList.empty(), false);
