import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

function maxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

function maxDepthWithStack(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  const stack: Array<[TreeNode, number]> = [[root, 1]];
  let ans = 0;

  while (stack.length) {
    let [node, depth] = stack.pop()!;
    ans = Math.max(ans, depth);

    if (node.left) {
      stack.push([node.left, depth + 1]);
    }
    if (node.right) {
      stack.push([node.right, depth + 1]);
    }
  }

  return ans;
}
