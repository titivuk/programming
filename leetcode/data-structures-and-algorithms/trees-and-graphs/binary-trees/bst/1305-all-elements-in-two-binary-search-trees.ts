import { TreeNode } from "../tree-node.js";

// https://leetcode.com/problems/all-elements-in-two-binary-search-trees/

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

function getAllElements(
  root1: TreeNode | null,
  root2: TreeNode | null
): number[] {
  function dfs(node: TreeNode | null, sortedNodes: number[]) {
    if (!node) {
      return;
    }

    dfs(node.left, sortedNodes);
    sortedNodes.push(node.val);
    dfs(node.right, sortedNodes);
  }

  let sortedNodes1: number[] = [],
    sortedNodes2: number[] = [];
  dfs(root1, sortedNodes1);
  dfs(root2, sortedNodes2);

  let answer: number[] = [];

  // merge two sorted arrays
  let i = 0,
    j = 0;

  // iterate until we reach one of the array end
  while (i < sortedNodes1.length && j < sortedNodes2.length) {
    // push the least value to the answer and increment index to compare next element on the next iteration
    if (sortedNodes1[i] < sortedNodes2[j]) {
      answer.push(sortedNodes1[i]);
      i += 1;
    } else {
      answer.push(sortedNodes2[j]);
      j += 1;
    }
  }

  // when we reach one of the array ends
  // the other array might have remaining values
  // since they are sorted and they are bigger than every value in "answer"
  // just push it
  if (i < sortedNodes1.length) {
    answer.push(...sortedNodes1.slice(i));
  }

  if (j < sortedNodes2.length) {
    answer.push(...sortedNodes2.slice(j));
  }

  return answer;
}
