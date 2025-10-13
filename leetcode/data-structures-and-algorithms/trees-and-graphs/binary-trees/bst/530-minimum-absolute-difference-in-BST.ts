import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/range-sum-of-bst/

// Given the root node of a binary search tree and two integers low and high,
// return the sum of values of all nodes with a value in the inclusive range [low, high].

function getMinimumDifference_array(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const sortedNodes: number[] = [];
  // !!!
  // in-order left-first DFS on a BST returns visits the nodes in sorted order
  function sortDfs(node: TreeNode | null) {
    if (!node) {
      return;
    }

    sortDfs(node.left);
    sortedNodes.push(node.val);
    sortDfs(node.right);
  }

  sortDfs(root);

  let answer = Number.POSITIVE_INFINITY;
  for (let i = 1; i < sortedNodes.length; i++) {
    answer = Math.min(answer, Math.abs(sortedNodes[i] - sortedNodes[i - 1]));
  }

  return answer;
}

function getMinimumDifference(root: TreeNode | null): number {
  let min = Number.POSITIVE_INFINITY;
  let prev: number;

  // in-order left-first
  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }

    dfs(node.left);

    if (typeof prev === 'number') {
      min = Math.min(min, node.val - prev);
    }
    prev = node.val;

    dfs(node.right);
  }

  dfs(root);

  return min;
};