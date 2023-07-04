import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/palindrome-linked-list/

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise

function isPalindrome(head: ListNode | null): boolean {
  let slow = head,
    fast = head;

  // find middle now using Floyd's Cycle Detection Algorithm
  // 1 -> 2 -> [2] -> 1 - middle node in square brackets
  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;
  }

  // reverse the 2nd half of the linked list
  // after reversing
  // head = 1 -> 2
  // prev = 1 -> 2
  let middleNode = slow,
    next: ListNode | null,
    prev: ListNode | null = null;
  while (middleNode) {
    next = middleNode.next;
    middleNode.next = prev;
    prev = middleNode;
    middleNode = next;
  }

  // iterate over the 1st half of the list from head
  // and reversed 2nd half from tail
  // and simultaneously compare values
  let tail = prev;
  while (tail) {
    if (head?.val !== tail?.val) {
      return false;
    }

    head = head?.next ?? null;
    tail = tail?.next ?? null;
  }

  return true;
}

deepStrictEqual(
  isPalindrome(createSinglyLinkedListFromArray([1, 2, 2, 1])),
  true
);

deepStrictEqual(isPalindrome(createSinglyLinkedListFromArray([1, 2])), false);
