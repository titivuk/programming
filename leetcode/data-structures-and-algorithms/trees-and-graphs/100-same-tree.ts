import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/same-tree/

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // both nodes missing
  if (!p && !q) {
    return true;
  }

  // one of the node is missing
  if (!p || !q) {
    return false;
  }

  // both nodes exists but value is not the same
  if (p.val !== q.val) {
    return false;
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
