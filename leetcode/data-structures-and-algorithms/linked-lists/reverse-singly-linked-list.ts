import { deepStrictEqual } from "assert";
import { SinglyListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

function reverseList(head: SinglyListNode | null): SinglyListNode | null {
  let curr = head;
  let prev = null;

  let nextNode: SinglyListNode | null;
  while (curr) {
    nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  return prev;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseList(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]))
  ),
  [5, 4, 3, 2, 1]
);
