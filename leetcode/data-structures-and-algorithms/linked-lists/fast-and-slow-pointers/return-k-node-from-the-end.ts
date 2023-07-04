import { strictEqual } from "assert";
import { SinglyListNode } from "../singly-linked-list.js";
import { createSinglyLinkedListFromArray } from "../utils/index.js";

// https://leetcode.com/problems/linked-list-cycle/

// Example 3: Given the head of a linked list and an integer k, return the k-th node from the end.
// For example, given the linked list that represents 1 -> 2 -> 3 -> 4 -> 5 and k = 2, return the node with value 4, as it is the 2nd node from the end.

// If we separate the two pointers by a gap of k, and then move them at the same speed,
// they will always be k apart. When the fast pointer (the one further ahead) reaches the end,
// then the slow pointer must be at the desired node, since it is k nodes behind.
function findNode(head: SinglyListNode | null, k: number): boolean {
  let slow = head,
    fast = head;

  for (let i = 0; i < k; i++) {
    fast = fast?.next ?? null;
  }

  while (fast) {
    slow = slow?.next ?? null;
    fast = fast.next;
  }

  return slow?.val;
}

strictEqual(findNode(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]), 2), 4);
