import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/diameter-of-binary-tree/description/

// Given the root of a binary tree, return the length of the diameter of the tree.
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.

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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }

    // recursively find the longest path in
    // both left child and right child
    let left = dfs(node.left);
    let right = dfs(node.right);

    // update the diameter if left_path plus right_path is larger
    diameter = Math.max(diameter, left + right);

    // return the longest one between left_path and right_path;
    // remember to add 1 for the path connecting the node and its parent
    return Math.max(left, right) + 1;
  }

  dfs(root);

  return diameter;
}
