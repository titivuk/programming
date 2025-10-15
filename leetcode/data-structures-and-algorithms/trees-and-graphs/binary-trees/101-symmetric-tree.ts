import { TreeNode } from "./tree-node.js";

/**
 * Definition for a binary tree root.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return false;
  }

  return dfs(root.left, root.right);
};

function dfs(left: TreeNode | null, right: TreeNode | null): boolean {
  if (!left && !right) {
    return true;
  }

  if (!left || !right) {
    return false
  }

  if (left.val !== right.val) {
    return false;
  }

  return dfs(left.left, right.right) && dfs(left.right, right.left);
}
