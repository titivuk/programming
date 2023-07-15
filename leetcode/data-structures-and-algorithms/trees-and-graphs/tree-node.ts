export class TreeNode<T = any> {
  val: T;
  left: this | null;
  right: this | null;

  constructor(val: T) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
