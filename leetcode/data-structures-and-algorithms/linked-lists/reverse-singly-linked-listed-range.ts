import { deepStrictEqual } from "assert";
import { SinglyListNode as ListNode } from "./singly-linked-list.js";
import {
  createSinglyLinkedListFromArray,
  createArrayFromSinglyLinkedList,
} from "./utils/index.js";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/704/linked-lists/4598/

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let prev: ListNode | null = null,
    curr: ListNode | null = head,
    next: ListNode | null = head.next;

  let conn: ListNode | null = null,
    tail: ListNode | null = null;

  let i = 1;
  while (curr && i <= right) {
    if (i === left) {
      tail = curr;

      prev = curr;
      curr = curr.next;
    } else if (left < i && i <= right) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    } else {
      if (i === left - 1) {
        conn = curr;
      }

      prev = curr;
      curr = curr.next;
    }

    i += 1;
  }

  if (conn) {
    conn.next = prev;
  } else {
    head = prev;
  }

  tail!.next = curr;

  return head;
}

function reverseBetweenLeetCodeApproach(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head) {
    return head;
  }

  let prev: ListNode | null = null,
    curr: ListNode | null = head;
  // move pointers to starting points
  // curr - the 1st node of the sub list that has to be reversed (it will become the last after reverse)
  // prev - last node BEFORE the sub list (we will connect reversed sublist to that node later)
  while (left > 1) {
    prev = curr;
    curr = curr?.next ?? null;

    left -= 1;
    right -= 1;
  }

  // conn - the 1st node of the sub list (it will become the last after reverse)
  // prev - the last node BEFORE the sub list (we will connect reversed sublist to that node later)
  const conn = prev,
    tail = curr;

  // reverse linked list in range of [left, right]
  let next: ListNode | null = null;
  while (right > 0) {
    next = curr?.next ?? null;
    curr!.next = prev;
    prev = curr;
    curr = next;

    right--;
  }

  // now if there is node before sublist - connect the sublist with that node (reversed sublist start from prev node)
  if (conn) {
    conn.next = prev;
  }
  // if there is no node - sublist starts from head
  else {
    head = prev;
  }

  // after we reversed sublist curr points to the first node after sublist
  // so we connect tail of sublist to that node
  tail!.next = curr;

  return head;
}

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetween(createSinglyLinkedListFromArray([3, 5]), 1, 2)
  ),
  [5, 3]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetween(createSinglyLinkedListFromArray([3, 5]), 1, 1)
  ),
  [3, 5]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetween(createSinglyLinkedListFromArray([1, 2, 3, 4, 5]), 2, 4)
  ),
  [1, 4, 3, 2, 5]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetween(createSinglyLinkedListFromArray([5]), 1, 1)
  ),
  [5]
);

deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetweenLeetCodeApproach(
      createSinglyLinkedListFromArray([3, 5]),
      1,
      2
    )
  ),
  [5, 3]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetweenLeetCodeApproach(
      createSinglyLinkedListFromArray([3, 5]),
      1,
      1
    )
  ),
  [3, 5]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetweenLeetCodeApproach(
      createSinglyLinkedListFromArray([1, 2, 3, 4, 5]),
      2,
      4
    )
  ),
  [1, 4, 3, 2, 5]
);
deepStrictEqual(
  createArrayFromSinglyLinkedList(
    reverseBetweenLeetCodeApproach(createSinglyLinkedListFromArray([5]), 1, 1)
  ),
  [5]
);
