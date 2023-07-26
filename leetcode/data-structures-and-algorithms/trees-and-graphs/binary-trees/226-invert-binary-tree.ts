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

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  invertTree(root.left);
  invertTree(root.right);
  let tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  return root;
}
