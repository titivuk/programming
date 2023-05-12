import { LinkedList, ListNode } from "./linked-list";

function reverseList(list: LinkedList<any>) {
  let curr = list.head;
  let prev: ListNode<any> | null = null;
  let next: ListNode<any> | null = null;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  list.head = prev;
}

const list = new LinkedList<number>();

list.add(1).add(2).add(3).add(4).add(5);
console.log("list", list.toArray());
reverseList(list);
console.log("reversed list", list.toArray());
