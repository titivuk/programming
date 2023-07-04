import { deepStrictEqual } from "assert";
import { SinglyListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

function deleteDuplicates(head: SinglyListNode | null): SinglyListNode | null {
  let curr = head;

  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1, 2]))
  ),
  [1, 2]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1, 2, 3, 3]))
  ),
  [1, 2, 3]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1, 1]))
  ),
  [1]
);
