export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;

  add(value: T) {
    const newNode = new ListNode(value);

    let lastNode = this.head;
    while (lastNode?.next) {
      lastNode = lastNode.next;
    }

    if (lastNode) {
      lastNode.next = newNode;
    } else {
      this.head = newNode;
    }

    return this;
  }

  toArray(): T[] {
    let result: T[] = [];

    let currentNode = this.head;
    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }
}
