import { TreeNode } from "./tree-node.js";

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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leaves1: number[] = [],
    leaves2: number[] = [];

  function dfs(node: TreeNode | null, leaves: number[]) {
    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      leaves.push(node.val);
      return;
    }

    dfs(node.left, leaves);
    dfs(node.right, leaves);
  }

  dfs(root1, leaves1);
  dfs(root2, leaves2);

  for (let i = 0; i < Math.max(leaves1.length, leaves2.length); i++) {
    if (leaves1[i] !== leaves2[i]) {
      return false;
    }
  }

  return true;
}
