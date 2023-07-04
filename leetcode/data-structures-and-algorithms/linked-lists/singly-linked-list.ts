export class SinglyListNode<T = any> {
  val: T;
  next: SinglyListNode<T> | null = null;

  constructor(value: T) {
    this.val = value;
  }
}
