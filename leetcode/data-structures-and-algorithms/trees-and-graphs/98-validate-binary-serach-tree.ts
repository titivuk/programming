import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/range-sum-of-bst/

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

function isValidBST(root: TreeNode | null): boolean {
  if (!root) {
    return false;
  }

  function dfs(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) {
      return true;
    }

    // if node not in the allowed range - tree is not BST
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // for left we care that every chilren.val < node.val so we set max = node.val
    // for right we care that every children.val > node.val so we set min = node.val
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }

  // for root we can use infinity values
  return dfs(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

function isValidBSTWithArray(root: TreeNode | null): boolean {
  if (!root) {
    return false;
  }

  const sortedNodes: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }

    dfs(node.left);
    sortedNodes.push(node.val);
    dfs(node.right);
  }

  dfs(root);

  // in-order left-first DFS on a BST returns visits the nodes in sorted order
  for (let i = 1; i < sortedNodes.length; i++) {
    // if the rule above violated - its not valid BST
    if (sortedNodes[i] <= sortedNodes[i - 1]) {
      return false;
    }
  }

  return true;
}
