import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

function deleteDuplicates(head: ListNode | null): ListNode | null {
  // dummy head allows us to avoid if else statements when "lastSeenUniqueNode" is not set yet
  // such case can happen when there are duplicates in the beginning of the list and "lastSeenUniqueNode" still null
  // we set it -101 so there is no way it's equal to any of list node
  const dummyHead = new ListNode(-101);
  dummyHead.next = head;

  let slow: ListNode | null = dummyHead,
    fast: ListNode | null = head,
    lastSeenUniqueNode: ListNode | null = dummyHead;

  while (fast) {
    if (slow!.val === fast.val) {
      // if slow.val === fast.val
      // then move fast pointer to the next node with different value
      while (slow!.val === fast?.val) {
        fast = fast!.next;
      }
      // after the loop above, fast - the 1st node from the next group

      // remove nodes between "lastSeenUniqueNode" and "fast"
      // i.e. remove all duplicates that have value = slow.val
      lastSeenUniqueNode!.next = fast;
    } else {
      lastSeenUniqueNode = slow;
    }

    // move slow pointer to fast node
    // set fast pointer to slow.next
    slow = fast;
    fast = fast?.next ?? null;
  }

  return dummyHead.next;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 2, 3, 3, 4, 4, 5]))
  ),
  [1, 2, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1, 1, 2, 3, 3, 3, 5]))
  ),
  [2, 5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    deleteDuplicates(createSinglyLinkedListFromArray([1, 1]))
  ),
  []
);
