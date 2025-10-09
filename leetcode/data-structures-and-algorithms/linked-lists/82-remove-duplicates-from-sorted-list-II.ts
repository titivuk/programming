import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let cur = head;
  while (cur) {
    let start = cur.next;
    while (start && cur.val === start.val) {
      start = start.next;
    }
    cur.next = start;
    cur = cur.next;
  }

  return head;
};

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 2, 3, 3, 4, 4, 5]))
  ),
  [1, 2, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1, 1, 2, 3, 3, 3, 5]))
  ),
  [2, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1]))
  ),
  []
);
