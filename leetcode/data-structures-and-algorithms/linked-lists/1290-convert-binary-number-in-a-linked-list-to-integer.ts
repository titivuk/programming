import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/

// Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.
// Return the decimal value of the number in the linked list.
// The most significant bit is at the head of the linked list.

function getDecimalValue(head: ListNode | null): number {
  let result = 0;

  while (head) {
    result = result * 2 + head.val;
    head = head.next;
  }

  return result;
}

deepStrictEqual(getDecimalValue(createSinglyLinkedListFromArray([1, 0, 1])), 5);
deepStrictEqual(getDecimalValue(createSinglyLinkedListFromArray([0])), 0);
