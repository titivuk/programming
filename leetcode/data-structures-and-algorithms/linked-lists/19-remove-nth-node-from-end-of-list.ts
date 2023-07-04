import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

// Given the head of a linked list, remove the n-th node from the end of the list and return its head.

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let fast: ListNode | null = head,
    slow: ListNode | null = head;

  // move fast pointer on the n-th position
  for (let i = 0; i < n; i++) {
    fast = fast!.next;
  }

  // run 2 pointers
  // fast - from n-th position
  // slow - from head
  // when fast = tail
  // then slow  = n-th node form the end
  let prev: ListNode | null = null;
  while (fast) {
    prev = slow;

    slow = slow!.next;
    fast = fast.next;
  }

  // remove n-th node from the end
  if (prev) {
    prev.next = slow!.next;
  }
  // if no prev - n-th node from the end is head
  else {
    head = slow!.next;
  }

  return head;
}

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
