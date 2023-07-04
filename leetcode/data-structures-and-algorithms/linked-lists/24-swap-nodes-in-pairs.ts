import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/swap-nodes-in-pairs/

// Given a linked list, swap every two adjacent nodes and return its head.
// You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

/**
 * @description Incoming Linked List (A -> B) -> (C -> D). Swap adjacent nodes. Expected result (B -> A) -> (D -> C)
 * Pairs are in brackets
 */
function swapPairs(head: ListNode | null): ListNode | null {
  let nodeA = head,
    prev: ListNode | null = null,
    nodeB: ListNode | null = null;

  let newHead = head?.next ?? head;

  // on each iteration we swap A <-> B
  while (nodeA && nodeA.next) {
    if (prev) {
      // prev - right item of previous pair AFTER swap, i.e. A
      // curr - left item of the current pair BEFORE swap, i.e. C
      // curr.next - right item of the current pair BEFORE swap, i.e. D
      // since we know that C <-> D will be swapped
      // we connect A with D
      prev.next = nodeA.next;
    }

    // save A to connect it to the right part of the list on the next iteration
    prev = nodeA;

    // save B
    nodeB = nodeA.next;
    // set reference from A to C
    nodeA.next = nodeA.next.next;
    // set reference from B to A
    nodeB.next = nodeA;

    // change current from A to C
    nodeA = nodeA.next;
  }

  return newHead;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapPairs(createSinglyLinkedListFromArray([1, 2, 3, 4]))
  ),
  [2, 1, 4, 3]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapPairs(createSinglyLinkedListFromArray([1]))
  ),
  [1]
);
