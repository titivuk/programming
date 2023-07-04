import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/odd-even-linked-list/

// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
// The first node is considered odd, and the second node is even, and so on.
// Note that the relative order inside both the even and odd groups should remain as it was in the input.
// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) {
    return head;
  }

  const headEven = head.next;

  let oddPointer: ListNode | null = head,
    evenPointer: ListNode | null = headEven;

  while (evenPointer && evenPointer.next) {
    oddPointer!.next = oddPointer!.next!.next;
    oddPointer = oddPointer!.next;

    evenPointer.next = evenPointer.next.next;
    evenPointer = evenPointer.next;
  }

  // after the loop above, oddPointer - tail of odd nodes
  // concat linked list
  oddPointer!.next = headEven;

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    oddEvenList(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]))
  ),
  [1, 3, 5, 2, 4]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    oddEvenList(createSinglyLinkedListFromArray([2, 1, 3, 5, 6, 4, 7]))
  ),
  [2, 3, 6, 7, 1, 5, 4]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    oddEvenList(createSinglyLinkedListFromArray([1, 2, 3, 4, 5, 6, 7, 8]))
  ),
  [1, 3, 5, 7, 2, 4, 6, 8]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    oddEvenList(createSinglyLinkedListFromArray([1]))
  ),
  [1]
);
