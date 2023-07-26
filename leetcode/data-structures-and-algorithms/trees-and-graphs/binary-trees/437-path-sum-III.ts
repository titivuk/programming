import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/path-sum-iii/

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

function pathSum(root: TreeNode | null, targetSum: number): number {
  const prefixSumCounter = new Map([[0, 1]]);

  let answer = 0;
  function dfs(node: TreeNode | null, currPathSum: number) {
    if (!node) {
      return;
    }

    // at each node, we can get the currPathSum (from root to current node)
    currPathSum += node.val;
    // if within this path, there is a valid solution, then there must be a oldPathSum such that currPathSum - oldPathSum = target
    answer += prefixSumCounter.get(currPathSum - targetSum) ?? 0;

    prefixSumCounter.set(
      currPathSum,
      (prefixSumCounter.get(currPathSum) ?? 0) + 1
    );

    dfs(node.left, currPathSum);
    dfs(node.right, currPathSum);

    // when move to a different branch, the currPathSum is no longer available, hence remove one
    prefixSumCounter.set(
      currPathSum,
      (prefixSumCounter.get(currPathSum) as number) - 1
    );
  }

  dfs(root, 0);

  return answer;
}
