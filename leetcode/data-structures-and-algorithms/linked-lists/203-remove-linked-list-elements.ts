import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/remove-linked-list-elements/

// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummyHead = new ListNode(0);
  dummyHead.next = head;

  let curr = head,
    prev = dummyHead;
  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }

    curr = curr.next;
  }

  return dummyHead.next;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeElements(createSinglyLinkedListFromArray([1, 2, 6, 3, 4, 5, 6]), 6)
  ),
  [1, 2, 3, 4, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeElements(createSinglyLinkedListFromArray([]), 1)
  ),
  []
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    removeElements(createSinglyLinkedListFromArray([7, 7, 7, 7]), 7)
  ),
  []
);
