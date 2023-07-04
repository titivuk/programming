// https://leetcode.com/problems/design-linked-list/

class ListNode {
  val: any;
  next: ListNode | null = null;

  constructor(val: any) {
    this.val = val;
  }
}

class MyLinkedList {
  private head: ListNode | null = null;
  private tail: ListNode | null = this.head;
  private len = 0;

  get(index: number): number {
    let curr = this.head;

    for (let i = 0; i < index; i++) {
      curr = curr?.next ?? null;
    }

    if (curr) {
      return curr.val;
    }

    return -1;
  }

  addAtHead(val: number): void {
    const node = new ListNode(val);

    node.next = this.head;
    this.head = node;

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.len += 1;
  }

  addAtTail(val: number): void {
    const node = new ListNode(val);

    if (!this.tail) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.len += 1;
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.len) {
      return;
    }

    if (this.len === index) {
      this.addAtTail(val);
      return;
    }

    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    let curr: ListNode = this.head!,
      prev: ListNode = this.head!;
    for (let i = 0; i < index; i++) {
      prev = curr;
      curr = curr.next!;
    }

    const node = new ListNode(val);

    prev.next = node;
    node.next = curr;

    this.len += 1;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.len - 1) {
      return;
    }

    let dummy = new ListNode(0);
    dummy.next = this.head;
    let curr: ListNode = this.head!,
      prev: ListNode = dummy;
    for (let i = 0; i < index; i++) {
      prev = curr;
      curr = curr.next!;
    }

    prev.next = curr.next;

    this.head = dummy.next;
    if (this.tail === curr) {
      if (!this.head) {
        this.tail = this.head;
      } else {
        this.tail = prev;
      }
    }

    this.len -= 1;
  }
}

//   Your MyLinkedList object will be instantiated and called as such:

var obj = new MyLinkedList();

obj.addAtTail(1);
obj.addAtTail(2);
obj.addAtTail(3);
obj.addAtTail(4);

var param_1 = obj.addAtIndex(2, 10);

// obj.addAtHead(val);
// obj.addAtTail(val);
// obj.addAtIndex(index, val);
// obj.deleteAtIndex(index);
