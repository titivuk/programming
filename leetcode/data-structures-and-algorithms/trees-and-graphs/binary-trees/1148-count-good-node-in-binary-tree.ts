import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/count-good-nodes-in-binary-tree/

function goodNodes(root: TreeNode | null): number {
  function dfs(root: TreeNode | null, maxValue: number): number {
    if (!root) {
      return 0;
    }

    let left = dfs(root.left, Math.max(root.val, maxValue));
    let right = dfs(root.right, Math.max(root.val, maxValue));

    let counter = left + right;
    if (root.val >= maxValue) {
      counter += 1;
    }

    return counter;
  }

  if (!root) {
    return 0;
  }

  return dfs(root, root.val);
}

function goodNodesWithStack(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let stack: Array<[TreeNode, number]> = [[root, -Infinity]];
  let ans = 0;

  while (stack.length) {
    let [node, maxSoFar] = stack.pop()!;
    if (node.val >= maxSoFar) {
      ans++;
    }

    if (node.left) {
      stack.push([node.left, Math.max(maxSoFar, node.val)]);
    }
    if (node.right) {
      stack.push([node.right, Math.max(maxSoFar, node.val)]);
    }
  }

  return ans;
}
