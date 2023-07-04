import { SinglyListNode } from "../singly-linked-list.js";

export function createSinglyLinkedListFromArray<T = any>(
  arr: T[],
  cyclePos = -1
): SinglyListNode<T> | null {
  if (arr.length === 0) {
    return null;
  }

  let node = new SinglyListNode(arr[0]);
  const head = node;

  let cycleNode: SinglyListNode | null = null;
  if (cyclePos === 0) {
    cycleNode = node;
  }

  for (let i = 1; i < arr.length; i++) {
    node.next = new SinglyListNode(arr[i]);
    node = node.next;

    if (cyclePos === i) {
      cycleNode = node;
    }
  }

  if (cycleNode) {
    node.next = cycleNode;
  }

  return head;
}

export function createArrayFromSinglyLinkedList<T = any>(
  head: SinglyListNode | null
): T[] {
  let result: T[] = [];

  let currentNode = head;
  while (currentNode) {
    result.push(currentNode.val);
    currentNode = currentNode.next;
  }

  return result;
}
