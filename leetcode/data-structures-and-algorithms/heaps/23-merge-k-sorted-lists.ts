import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const dummy = new ListNode();
  let prev = dummy;
  const heap = new MinPriorityQueue<ListNode>((a) => a.val);

  while (true) {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]) {
        heap.push(new ListNode(lists[i]!.val));
        lists[i] = lists[i]!.next;
      }
    }

    if (heap.isEmpty()) {
      break;
    }

    prev.next = heap.pop();
    prev = prev.next;
  }

  return dummy.next;
}
