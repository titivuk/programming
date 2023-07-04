import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import { createSinglyLinkedListFromArray } from "./utils/index.js";

// https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/

// In a linked list of size n, where n is even, the ith node (0-indexed) of the linked list is known as the twin of the (n-1-i)th node, if 0 <= i <= (n / 2) - 1.
// For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. These are the only nodes with twins for n = 4.
// The twin sum is defined as the sum of a node and its twin.
// Given the head of a linked list with even length, return the maximum twin sum of the linked list.

function pairSumWithHalfSizeCounter(head: ListNode | null): number {
  let slow = head,
    fast = head;

  let counter = 0;
  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;

    counter += 1;
  }

  // reverse the 2nd half of the list
  let prev: ListNode | null = null,
    curr = slow,
    next: ListNode | null = null;

  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // define heads of both linked list halfs
  let leftPair = head as ListNode;
  let rightPair = prev as ListNode;

  let result = 0;
  // count MAX result traversing both halfs "counter" times
  for (let i = 0; i < counter; i++) {
    result = Math.max(result, leftPair.val + rightPair.val);

    leftPair = leftPair.next as ListNode;
    rightPair = rightPair.next as ListNode;
  }

  return result;
}

function pairSum(head: ListNode | null): number {
  let slow = head,
    fast = head,
    // we create variable to save last element of the 1st half of linked list
    leftHalfTail = head;

  while (fast && fast.next) {
    if (fast?.next?.next) {
      leftHalfTail = slow?.next ?? null;
    }

    slow = slow?.next ?? null;
    fast = fast.next.next;
  }

  // reverse the 2nd half of the list
  let prev: ListNode | null = null,
    curr = slow,
    next: ListNode | null = null;

  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // connect last element of the 1st half with the first element of the 2nd half
  // in this case linked list is fully valid and no references are broken
  leftHalfTail!.next = prev;

  slow = head;
  fast = prev;

  let result = 0;
  // apply fast and slow pointers approach again to calculate values
  // slow start from the head
  // fast starts from the middle of the linked list which is already reversed in the 2nd half
  while (fast) {
    result = Math.max(result, slow!.val + fast.val);

    slow = slow?.next ?? null;
    fast = fast.next;
  }

  return result;
}

function pairSumWithoutSecondTwoPointerIteration(
  head: ListNode | null
): number {
  let slow = head,
    fast = head;

  // find middle of the linked list
  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;
  }

  // reverse the 2nd half of the list
  let prev: ListNode | null = null,
    curr = slow,
    next: ListNode | null = null;
  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // find sum
  // iterate over both halfs in parallel
  // head - starting point of the 1st half
  // prev - starting point of the 2nd half
  let result = 0;
  while (prev) {
    result = Math.max(result, head!.val + prev.val);

    head = head!.next;
    prev = prev.next;
  }

  return result;
}

deepStrictEqual(
  pairSumWithHalfSizeCounter(createSinglyLinkedListFromArray([5, 4, 2, 1])),
  6
);
deepStrictEqual(
  pairSumWithHalfSizeCounter(createSinglyLinkedListFromArray([4, 2, 2, 3])),
  7
);
deepStrictEqual(
  pairSumWithHalfSizeCounter(createSinglyLinkedListFromArray([1, 100000])),
  100001
);

deepStrictEqual(pairSum(createSinglyLinkedListFromArray([5, 4, 2, 1])), 6);
deepStrictEqual(pairSum(createSinglyLinkedListFromArray([4, 2, 2, 3])), 7);
deepStrictEqual(pairSum(createSinglyLinkedListFromArray([1, 100000])), 100001);

deepStrictEqual(
  pairSumWithoutSecondTwoPointerIteration(
    createSinglyLinkedListFromArray([5, 4, 2, 1])
  ),
  6
);
deepStrictEqual(
  pairSumWithoutSecondTwoPointerIteration(
    createSinglyLinkedListFromArray([4, 2, 2, 3])
  ),
  7
);
deepStrictEqual(
  pairSumWithoutSecondTwoPointerIteration(
    createSinglyLinkedListFromArray([1, 100000])
  ),
  100001
);
