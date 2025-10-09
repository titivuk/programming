import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

// Given the head of a linked list, remove the n-th node from the end of the list and return its head.

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let fast = head;
  for (let i = 0; i < n - 1; i++) {
    fast = fast.next;
  }

  let prev = null
  let slow = head;
  while (fast.next) {
    fast = fast.next;

    prev = slow;
    slow = slow.next;
  }

  if (prev == null) {
    return slow.next;
  }
  prev.next = slow.next

  return head;
};

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeNthFromEnd(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]), 2)
  ),
  [1, 2, 3, 5]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeNthFromEnd(createSinglyLinkedListFromArray([1]), 1)
  ),
  []
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeNthFromEnd(createSinglyLinkedListFromArray([1, 2]), 1)
  ),
  [1]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeNthFromEnd(createSinglyLinkedListFromArray([1, 2]), 2)
  ),
  [2]
);
