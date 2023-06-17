class Node {
  readonly key: string;
  // let value be string for simplicity
  value: string;

  prev: Node | null = null;
  next: Node | null = null;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private capacity: number;
  private cache: Map<string, Node> = new Map();

  head: Node | null = null;
  tail: Node | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): string | undefined {
    const node = this.cache.get(key);
    if (!node) {
      return;
    }

    this.deleteItemFromList(node);
    this.setListHead(node);

    return node.value;
  }

  set(key: string, value: string) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key) as Node;
      node.value = value;

      this.deleteItemFromList(node);
      this.setListHead(node);
    } else {
      const node = new Node(key, value);

      if (this.cache.size === this.capacity) {
        if (this.tail) {
          this.cache.delete(this.tail.key);
        }

        this.deleteItemFromList(this.tail);
      }

      this.cache.set(key, node);
      this.setListHead(node);
    }
  }

  setListHead(node: Node) {
    node.next = this.head;
    node.prev = null;

    if (node.next) {
      node.next.prev = node;
    }

    this.head = node;

    if (this.head.next == null) {
      this.tail = this.head;
    }
  }

  deleteItemFromList(node: Node | null) {
    if (node == null) {
      return;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }
  }

  toArray() {
    const result = [];

    let node = this.head;
    while (node) {
      result.push(`${node.key}:${node.value}`);

      node = node.next;
    }

    return result;
  }
}

// dll test
// const listTestCache = new LRUCache(5);

// const node1 = new Node("a", "1");
// listTestCache.setListHead(node1);
// console.log(listTestCache.toArray());

// const node2 = new Node("b", "2");
// listTestCache.setListHead(node2);
// console.log(listTestCache.toArray());

// const node3 = new Node("c", "3");
// listTestCache.setListHead(node3);
// console.log(listTestCache.toArray());

// const node4 = new Node("d", "4");
// listTestCache.setListHead(node4);
// console.log(listTestCache.toArray());

// const node5 = new Node("e", "5");
// listTestCache.setListHead(node5);
// console.log(listTestCache.toArray());

// listTestCache.deleteItemFromList(node5);
// console.log(listTestCache.toArray());

// listTestCache.deleteItemFromList(node3);
// console.log(listTestCache.toArray());

// listTestCache.deleteItemFromList(node1);
// console.log(listTestCache.toArray());

// console.log(listTestCache.head);
// console.log(listTestCache.tail);

// cache test

// const tectCache = new LRUCache(3);

// tectCache.set("a", "1");
// console.log(tectCache.toArray());

// tectCache.get("a");
// console.log(tectCache.toArray());

// tectCache.set("b", "2");
// console.log(tectCache.toArray());

// tectCache.get("a");
// console.log(tectCache.toArray());

// tectCache.set("c", "3");
// console.log(tectCache.toArray());

// tectCache.get("b");
// console.log(tectCache.toArray());

// tectCache.set("d", "4");
// console.log(tectCache.toArray());

// tectCache.get("b");
// console.log(tectCache.toArray());