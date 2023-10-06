// https://leetcode.com/problems/closest-nodes-queries-in-a-binary-search-tree/

import { TreeNode } from "../trees-and-graphs/binary-trees/tree-node.js";

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

function closestNodes(root: TreeNode | null, queries: number[]): number[][] {
  // get ordered array of nodes by doing left-first DFS
  let values: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }

    dfs(node.left);
    values.push(node.val);
    dfs(node.right);
  }

  dfs(root);

  let answers: Array<[number, number]> = [];

  // for every query find the answer
  for (let q of queries) {
    answers.push([-1, -1]);

    // find max value lte than q
    let left = 0,
      right = values.length - 1;

    let mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (values[mid] <= q) {
        // simply remember every value that lte than q
        // every next found value is gte than the previous since array is sorted
        answers[answers.length - 1][0] = values[mid];

        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // find min value gte than q
    left = 0;
    right = values.length - 1;

    mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (values[mid] >= q) {
        // simply remember every value that gte than q
        // every next found value is lte than the previous since array is sorted
        answers[answers.length - 1][1] = values[mid];

        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return answers;
}

function test(values: number[], queries: number[]): number[][] {
  let answers: Array<[number, number]> = [];

  // for every query find the answer
  for (let q of queries) {
    answers.push([-1, -1]);

    let left = 0,
      right = values.length - 1;

    let mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (values[mid] <= q) {
        answers[answers.length - 1][0] = values[mid];

        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    left = 0;
    right = values.length - 1;

    mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (values[mid] >= q) {
        answers[answers.length - 1][1] = values[mid];

        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return answers;
}

test([1, 2, 4, 6, 9, 13, 14, 15], [2, 5, 16]);
