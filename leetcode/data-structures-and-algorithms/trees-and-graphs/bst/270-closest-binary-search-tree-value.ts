import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/closest-binary-search-tree-value/description/

// Given the root of a binary search tree and a target value,
// return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

function closestValue(root: TreeNode | null, target: number): number {
  if (!root) {
    return -1;
  }

  let answer: number = root.val;
  let currNode: TreeNode | null = root;
  while (currNode) {
    if (
      // currNode.val is closer to the target than current answer
      Math.abs(currNode.val - target) < Math.abs(answer - target) ||
      // currNode.val is on the same distance but value is less
      (Math.abs(currNode.val - target) === Math.abs(answer - target) &&
        currNode.val < answer)
    ) {
      answer = currNode.val;
    }

    // if target greater than currNode.val -> go to the right subtree
    // else -> go to the left subtree
    currNode = currNode.val < target ? currNode.right : currNode.left;
  }

  return answer;
}

function closestValueWithArray(root: TreeNode | null, target: number): number {
  const orderedValues: number[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }

    dfs(node.left);
    orderedValues.push(node.val);
    dfs(node.right);
  }

  dfs(root);

  let answer = 0;
  let diff = Number.POSITIVE_INFINITY;
  for (let i = 0; i < orderedValues.length; i++) {
    if (Math.abs(orderedValues[i] - target) < diff) {
      answer = orderedValues[i];
      diff = Math.abs(orderedValues[i] - target);
    }
  }

  return answer;
}
