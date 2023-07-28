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

function deleteNode(root: TreeNode | null, target: number): TreeNode | null {
  if (!root) {
    return root;
  }

  // left subtree contains values < root.val
  if (target < root.val) {
    root.left = deleteNode(root.left, target);
  }

  // right subtree contains values > root.val
  if (target > root.val) {
    root.right = deleteNode(root.right, target);
  }

  // target node found
  // there are 3 case to handle
  //  * target node is a leaf
  //  * target node has 1 child
  //  * target node has 2 children
  if (target === root.val) {
    // node is a leaf
    // return null
    // a -> target becomes a -> null
    if (!root.left && !root.right) {
      return null;
    }

    // node has one child
    // return reference of child to a parent, so target node will be skipped
    // a -> target -> c becomes a -> c, where target - target node
    if (!root.left || !root.right) {
      return root.left || root.right;
    }

    // node has both children
    // there are 2 options:
    //  * replace target node with least value from the right subtree
    //  * replace target nother with greatest value from the left subtree
    // we go with the the 2nd approach
    // greatest node of the left subtree is the "rightest" leaf
    // so we go to the "right" child until the leaf
    let leaf = root.left;
    while (leaf.right) {
      leaf = leaf.right;
    }

    // replace target.node val with leaf.val (we actually do no changeany references, just override value)
    root.val = leaf.val;
    // and then go and delete that leaf that we "moved" by value
    // now target = leaf.val
    // and deletion will be handled by the 1st leaf case
    root.left = deleteNode(root.left, leaf.val);
  }

  return root;
}
