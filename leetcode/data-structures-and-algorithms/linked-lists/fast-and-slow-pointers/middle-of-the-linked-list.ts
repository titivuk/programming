import { strictEqual } from "assert";
import { SinglyListNode } from "../singly-linked-list.js";
import { createSinglyLinkedListFromArray } from "../utils/index.js";

// Given the head of a singly linked list, return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.

function middleNode(head: SinglyListNode | null): SinglyListNode | null {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;
  }

  return slow;
}

strictEqual(
  middleNode(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]))?.val,
  3
);

strictEqual(
  middleNode(createSinglyLinkedListFromArray([1, 2, 3, 4, 5, 6]))?.val,
  4
);
