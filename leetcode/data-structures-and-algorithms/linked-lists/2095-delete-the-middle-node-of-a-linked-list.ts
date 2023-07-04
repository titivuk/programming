import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/

// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.
// For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return null;
  }

  let fast: ListNode | null = head,
    slow: ListNode | null = head;

  // node before middle
  let preMiddle: ListNode | null = null;
  while (fast && fast.next) {
    preMiddle = slow;

    slow = slow!.next;
    fast = fast.next.next;
  }

  preMiddle!.next = slow!.next;

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteMiddle(createSinglyLinkedListFromArray([1, 3, 4, 7, 1, 2, 6]))
  ),
  [1, 3, 4, 1, 2, 6]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteMiddle(createSinglyLinkedListFromArray([1, 2, 3, 4]))
  ),
  [1, 2, 4]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteMiddle(createSinglyLinkedListFromArray([2, 1]))
  ),
  [2]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteMiddle(createSinglyLinkedListFromArray([1]))
  ),
  []
);
