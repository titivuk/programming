import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/binary-tree-level-order-traversal/

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

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return [];
  }

  let nodes: TreeNode[] = [root];
  let nextLvlNodes: TreeNode[] = [];
  const values: number[][] = [];
  while (nodes.length > 0) {
    const curLvlValues = [];
    for (const n of nodes) {
      curLvlValues.push(n.val);

      if (n.left) nextLvlNodes.push(n.left);
      if (n.right) nextLvlNodes.push(n.right);
    }

    values.push(curLvlValues);

    nodes = nextLvlNodes;
    nextLvlNodes = [];
  }

  return values;
};

