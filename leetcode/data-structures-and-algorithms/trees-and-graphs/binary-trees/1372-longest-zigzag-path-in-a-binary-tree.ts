import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/

function longestZigZag(root: TreeNode | null): number {
  if (!root) {
    return -1;
  }

  let answer = -1;
  function dfs(node: TreeNode | null, prevDirection: string, pathLen: number) {
    if (!node) {
      return;
    }

    // if node is left child, i.e. parent.left = node
    // then go to the right with and continue zigzag by incrementing pathLen
    // and go to the left and reset zigzag value
    if (prevDirection !== "r") {
      dfs(node.right, "r", pathLen + 1);
      dfs(node.left, "l", 1);
    }

    // the same as for the case above
    if (prevDirection !== "l") {
      dfs(node.left, "l", pathLen + 1);
      dfs(node.right, "r", 1);
    }

    // set max value of path len
    answer = Math.max(answer, pathLen);
  }

  // use any prevDirection value apart "r" and "l" to go to both directions from root
  // inside the reccursion "l" or "r" value only used
  dfs(root, "any", 0);

  return answer;
}

function longestZigZagV2(root: TreeNode | null): number {
  if (!root) {
    return -1;
  }

  let answer = -1;
  function dfs(node: TreeNode | null): [number, number] {
    if (!node) {
      return [-1, -1];
    }

    // approach without "prevDirection" flag
    // every iteration of recursion returns tuple [left, right]
    // so for "left" we take tuple[1] = right
    // for "right" we take tuple[0] = left
    let left = dfs(node.left)[1] + 1;
    let right = dfs(node.right)[0] + 1;

    answer = Math.max(answer, left, right);

    return [left, right];
  }

  dfs(root);

  return answer;
}
