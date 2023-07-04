import { strictEqual } from "assert";
import { SinglyListNode } from "../singly-linked-list.js";
import { createSinglyLinkedListFromArray } from "../utils/index.js";

// https://leetcode.com/problems/linked-list-cycle/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.

function hasCycle(head: SinglyListNode | null): boolean {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
}

strictEqual(hasCycle(createSinglyLinkedListFromArray([3, 2, 0, -4], 1)), true);
