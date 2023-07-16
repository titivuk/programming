import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/

// Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.
// A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.

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

function maxAncestorDiff(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  // variable where we store answer
  let answer = 0;

  function dfs(node: TreeNode | null, min: number, max: number) {
    if (!node) {
      return;
    }

    // on every node calculate possible results
    let possibleAnswer = Math.max(
      Math.abs(node.val - min),
      Math.abs(node.val - max)
    );
    // and update answer if new max found
    answer = Math.max(answer, possibleAnswer);

    // update min / max values
    min = Math.min(min, node.val);
    max = Math.max(max, node.val);

    // go down
    dfs(node.left, Math.min(min, node.val), Math.max(max, node.val));
    dfs(node.right, Math.min(min, node.val), Math.max(max, node.val));
  }

  dfs(root, root.val, root.val);

  return answer;
}
