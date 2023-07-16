import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/insert-into-a-binary-search-tree/description/

// You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion.
// It is guaranteed that the new value does not exist in the original BST.
// Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  // if there is no root -> we made path from tree root to the lowest node
  // and we add "val" as leaf node
  if (!root) {
    return new TreeNode(val);
  }

  // It's guaranteed that val does not exist in the original BST.
  // if val < root.val - go to the left side of the tree
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  }
  // if val > root.val - go to the rigt side of the tree
  else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
