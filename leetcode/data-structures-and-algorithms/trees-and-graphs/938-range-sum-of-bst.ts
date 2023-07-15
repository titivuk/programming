import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/range-sum-of-bst/

// Given the root node of a binary search tree and two integers low and high,
// return the sum of values of all nodes with a value in the inclusive range [low, high].

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) {
    return 0;
  }

  let left = root.val > low ? rangeSumBST(root.left, low, high) : 0;
  let right = root.val < high ? rangeSumBST(root.right, low, high) : 0;

  if (low <= root.val && root.val <= high) {
    return root.val + left + right;
  }

  return left + right;
}
