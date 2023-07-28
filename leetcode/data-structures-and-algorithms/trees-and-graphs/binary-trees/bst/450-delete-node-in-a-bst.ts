import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/delete-node-in-a-bst/

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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) {
    return root;
  }

  if (root.val === key) {
    let newNode: TreeNode | null = root;

    if (!root.left) {
      newNode = root.right;
    } else if (!root.right) {
      newNode = root.left;
    } else {
      // it can be left, does not matter
      newNode = root.right;
    }

    return newNode;
  }

  root.left = deleteNode(root.left, key);
  root.right = deleteNode(root.right, key);

  return root;
}
