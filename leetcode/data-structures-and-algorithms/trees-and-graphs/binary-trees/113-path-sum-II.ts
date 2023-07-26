import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/path-sum-ii/

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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  function dfs(
    node: TreeNode | null,
    sum: number,
    path: number[],
    paths: number[][]
  ) {
    if (!node) {
      return;
    }

    path.push(node.val);

    // leaf and targetSum = sum
    if (!node.left && !node.right && sum - node.val === 0) {
      paths.push([...path]);
    }

    dfs(node.left, sum - node.val, path, paths);
    dfs(node.right, sum - node.val, path, paths);

    // remove node value from path when we go up back
    path.pop();
  }

  const paths: number[][] = [];
  const path: number[] = [];
  dfs(root, targetSum, path, paths);

  return paths;
}
