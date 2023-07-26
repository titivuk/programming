import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/delete-leaves-with-a-given-value/

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

function removeLeafNodes(
  root: TreeNode | null,
  target: number
): TreeNode | null {
  if (!root) {
    return root;
  }

  // do POSTORDER dfs
  // override references in case left or right might be deleted
  root.left = removeLeafNodes(root.left, target);
  root.right = removeLeafNodes(root.right, target);

  // if node is a leaf (or became a leaf after children got deleted) and val == target -> do not return its reference back
  if (!root.left && !root.right && root.val === target) {
    return null;
  }

  return root;
}
