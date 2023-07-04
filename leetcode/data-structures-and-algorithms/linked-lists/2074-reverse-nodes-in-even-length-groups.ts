import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createArrayFromSinglyLinkedList,
  createSinglyLinkedListFromArray,
} from "./utils/index.js";

// https://leetcode.com/problems/reverse-nodes-in-even-length-groups/
// You are given the head of a linked list.

// The nodes in the linked list are sequentially assigned to non-empty groups whose lengths form the sequence of the natural numbers (1, 2, 3, 4, ...). The length of a group is the number of nodes assigned to it. In other words,

// The 1st node is assigned to the first group.
// The 2nd and the 3rd nodes are assigned to the second group.
// The 4th, 5th, and 6th nodes are assigned to the third group, and so on.
// Note that the length of the last group may be less than or equal to 1 + the length of the second to last group.

// Reverse the nodes in each group with an even length, and return the head of the modified linked list.

function reverseEvenLengthGroups(head: ListNode | null): ListNode | null {
  let curr = head;

  // count number of nodes;
  let nodes = 0;
  while (curr) {
    nodes += 1;
    curr = curr.next;
  }

  curr = head;
  let prevGroupTail: ListNode | null = null;
  let currGroup = 1;
  let remainingNodes = nodes;
  while (curr) {
    let currGroupSize = Math.min(remainingNodes, currGroup);

    if (currGroupSize % 2 === 0) {
      // reverse the group
      let next: ListNode | null,
        prev: ListNode | null = null,
        newTail = curr;
      for (let i = 0; i < currGroupSize && curr; i++) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }

      // prev - head of reversed sub list
      // curr - tail of reversed sub list

      // connect previous group tail with the new head
      prevGroupTail!.next = prev;
      // remember last node of the group
      // because there is a possibility to have two consequtive groups that must be reversed
      prevGroupTail = newTail;
      // connect new tail with the next group
      newTail.next = curr;
    } else {
      // skip the group
      for (let i = 0; i < currGroupSize && curr; i++) {
        // remember last node of the group
        prevGroupTail = curr;
        curr = curr.next;
      }
    }

    // go to the next group
    currGroup += 1;
    // adjust number of remaining nodes
    remainingNodes -= currGroupSize;
  }

  return head;
}

function reverseEvenLengthGroupsV2(head: ListNode | null): ListNode | null {
  let curr = head;
  let prevGroupTail: ListNode | null = null;

  // limit len with 1e5 from tasks restrictions
  for (let len = 1; len < 1e5 && curr; len++) {
    // calculate current group length
    // group length cannot exceed len
    // and if groupTail.next = null then list ended
    let groupTail = curr;
    let groupLength = 1;
    while (groupLength < len && groupTail?.next) {
      groupTail = groupTail.next;
      groupLength += 1;
    }

    // save nextGroupHead before reversing
    let nextGroupHead = groupTail.next;
    if (groupLength % 2 === 0) {
      // reverse the group
      let next: ListNode | null,
        prev: ListNode | null = null,
        newTail = curr;

      // I think we could also us for loop and limit iterations by groupLength
      // but here we itarate until curr != null and until we reach next group head
      while (curr && curr !== nextGroupHead) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }

      // connect previous group tail with the group new head
      prevGroupTail!.next = prev;
      // remember last node of the group
      prevGroupTail = newTail;
      // connect new tail with the next group
      newTail.next = nextGroupHead;
    } else {
      // remember last node of the group
      prevGroupTail = groupTail;
      curr = groupTail.next;
    }
  }

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseEvenLengthGroupsV2(
      createSinglyLinkedListFromArray([5, 2, 6, 3, 9, 1, 7, 3, 8, 4])
    )
  ),
  [5, 6, 2, 3, 9, 1, 4, 8, 3, 7]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseEvenLengthGroupsV2(createSinglyLinkedListFromArray([1, 1, 0, 6]))
  ),
  [1, 0, 1, 6]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseEvenLengthGroupsV2(createSinglyLinkedListFromArray([1, 1, 0, 6, 5]))
  ),
  [1, 0, 1, 5, 6]
);
