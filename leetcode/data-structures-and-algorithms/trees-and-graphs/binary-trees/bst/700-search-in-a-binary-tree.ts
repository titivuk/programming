import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/search-in-a-binary-search-tree/

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    return null;
  }

  if (root.val === val) {
    return root;
  }

  if (root.val < val) {
    return searchBST(root.right, val);
  } else {
    return searchBST(root.left, val);
  }
}
