import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/even-odd-tree/

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

function isEvenOddTree(root: TreeNode | null): boolean {
  if (!root) {
    return false;
  }

  let currLvlNodes: TreeNode[] = [root],
    nextLvlNodes: TreeNode[] = [];

  let level = 0;
  let node: TreeNode;
  while (currLvlNodes.length > 0) {
    // Since we start for loop from i = 1
    // dirty hack to apply logic to the 0-th element before the loop

    // For every even-indexed level, all nodes at the level have odd integer values
    // For every odd-indexed level, all nodes at the level have even integer values
    if (currLvlNodes[0].val % 2 === level % 2) {
      return false;
    }

    if (currLvlNodes[0].left) {
      nextLvlNodes.push(currLvlNodes[0].left);
    }

    if (currLvlNodes[0].right) {
      nextLvlNodes.push(currLvlNodes[0].right);
    }

    // start from 1 and compare with previous value
    for (let i = 1; i < currLvlNodes.length; i++) {
      node = currLvlNodes[i];

      // For every even-indexed level, all nodes at the level have odd integer values
      // For every odd-indexed level, all nodes at the level have even integer values
      if (node.val % 2 === level % 2) {
        return false;
      }

      // strictly increasing
      if (level % 2 === 0) {
        if (node.val <= currLvlNodes[i - 1].val) {
          return false;
        }
      }
      // strictly decreasing
      else {
        if (node.val >= currLvlNodes[i - 1].val) {
          return false;
        }
      }

      if (node.left) {
        nextLvlNodes.push(node.left);
      }

      if (node.right) {
        nextLvlNodes.push(node.right);
      }
    }

    currLvlNodes = nextLvlNodes;
    nextLvlNodes = [];

    level += 1;
  }

  return true;
}
