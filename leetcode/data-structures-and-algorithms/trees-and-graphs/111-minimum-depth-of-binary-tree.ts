import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

// Given a binary tree, find its minimum depth.
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
// Note: A leaf is a node with no children.

/**
 * Definition for a binary tree node.
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

function minDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  // if node is not leaf - it has at least 1 child
  // skip nullish branch
  // we can use like root.left && !root.right
  // but it does not matter
  // if they are both missing, their depth will be the same - 0
  if (!root.right) {
    return 1 + minDepth(root.left);
  }

  if (!root.left) {
    return 1 + minDepth(root.right);
  }

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
