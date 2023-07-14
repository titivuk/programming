import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/path-sum/

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // Since Input: root = [], targetSum = 0 -> Output: false
  // Slightly modify checks
  if (!root) {
    return false;
  }

  // if root is leaf and SUM(path) == targetSum
  // return true - path exists
  if (!root.left && !root.right && targetSum - root.val === 0) {
    return true;
  }

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}

function hasPathSumWithStack(
  root: TreeNode | null,
  targetSum: number
): boolean {
  if (!root) {
    return false;
  }

  const stack: Array<[TreeNode, number]> = [[root, 0]];

  while (stack.length > 0) {
    let [node, curr] = stack.pop()!;

    if (!node.left && !node.right) {
      if (curr + node.val === targetSum) {
        return true;
      }
    }

    if (node.left) {
      stack.push([node.left, curr + node.val]);
    }
    if (node.right) {
      stack.push([node.right, curr + node.val]);
    }
  }

  return false;
}
