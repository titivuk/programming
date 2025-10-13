import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

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

function lowestCommonAncestorV1(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // p <= ancestor < q

  let min = Math.min(p?.val, q?.val);
  let max = Math.max(p?.val, q?.val);

  let answer: TreeNode | null = null;
  function dfs(node: TreeNode | null): number {
    if (!node) {
      return 0;
    }

    let counter = 0;
    if (node.val === min || node.val === max) {
      counter += 1;
    }

    // since it's BST we can optimize traversing
    // left subtree contains values less than node.val
    // so if min > node.val it does not make sense to check left subtree
    if (min < node.val) {
      counter += dfs(node.left);
    }

    // the similar logic applies to right subtree
    // right subtree contains values greater than node.val
    // so if max < node.val it does not make sense to check right subtree
    if (max > node.val) {
      counter += dfs(node.right);
    }

    if (counter === 2 && !answer) {
      answer = node;
    }

    return counter;
  }

  dfs(root);

  return answer;
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (!root) {
    return null;
  }

  // current node is of those we are lookin for
  if (root === q || root === p) {
    return root;
  }

  // since it's BST we can optimize traversing
  // left subtree contains values less than node.val
  // so if min > node.val it does not make sense to check left subtree
  let left: TreeNode | null = null;
  if (Math.min(p?.val, q?.val) < root.val) {
    left = lowestCommonAncestor(root.left, p, q);
  }

  // the similar logic applies to right subtree
  // right subtree contains values greater than node.val
  // so if max < node.val it does not make sense to check right subtree
  let right: TreeNode | null = null;
  if (Math.max(p?.val, q?.val) > root.val) {
    right = lowestCommonAncestor(root.right, p, q);
  }

  // if we found left and right -> current node is min ancestor
  // because we do postorder this statement is true on the closest parent
  if (left && right) {
    return root;
  }

  // if we found ancestor already
  // just propagate it to the top and return as result
  return left || right;
}

// easier for me understand
function lowestCommonAncestor_2025(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root) {
    return null;
  }

  let node: TreeNode | null = root;

  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right
    } else {
      return node;
    }
  }

  return null;
};
