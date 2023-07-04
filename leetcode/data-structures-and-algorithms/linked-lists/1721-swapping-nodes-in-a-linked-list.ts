import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/swapping-nodes-in-a-linked-list/

// You are given the head of a linked list, and an integer k.
// Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

function swapNodes(head: ListNode | null, k: number): ListNode | null {
  let slow = head,
    fast = head;

  for (let i = 0; i < k - 1; i++) {
    fast = fast?.next ?? null;
  }
  let kthBegin = fast ?? null;
  fast = fast?.next ?? null;

  while (fast) {
    slow = slow?.next ?? null;
    fast = fast.next;
  }
  let kthEnd = slow;

  let tmp = kthBegin?.val;
  kthBegin!.val = kthEnd?.val;
  kthEnd!.val = tmp;

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapNodes(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]), 2)
  ),
  [1, 4, 3, 2, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapNodes(
      createSinglyLinkedListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
      5
    )
  ),
  [1, 2, 3, 4, 6, 5, 7, 8, 9, 0]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapNodes(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]), 1)
  ),
  [5, 2, 3, 4, 1]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapNodes(createSinglyLinkedListFromArray([1]), 1)
  ),
  [1]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    swapNodes(createSinglyLinkedListFromArray([100, 90]), 2)
  ),
  [90, 100]
);
