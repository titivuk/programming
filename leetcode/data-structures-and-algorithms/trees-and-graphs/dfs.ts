import { TreeNode } from "./tree-node.js";

function recursiveDfs(node: TreeNode | null) {
  if (!node) {
    return;
  }

  recursiveDfs(node.left);
  recursiveDfs(node.right);

  return;
}

function preorderRecursiveDfs(node: TreeNode | null) {
  if (!node) {
    return;
  }

  // 1. apply logic to the current node
  // 2. apply logic to left child
  // 3. apply logic to the right child
  console.log(node.val);
  preorderRecursiveDfs(node.left);
  preorderRecursiveDfs(node.right);

  return;
}

function inorderRecursiveDfs(node: TreeNode | null) {
  if (!node) {
    return;
  }

  // 1. apply logic to left child first
  // 2. apply logic to the current node
  // 3. apply logic to the right child
  inorderRecursiveDfs(node.left);
  console.log(node.val);
  inorderRecursiveDfs(node.right);

  return;
}

function postorderRecursiveDfs(node: TreeNode | null) {
  if (!node) {
    return;
  }

  // 1. apply logic to left child first
  // 2. apply logic to the right child
  // 3. apply logic to the current node
  postorderRecursiveDfs(node.left);
  postorderRecursiveDfs(node.right);
  console.log(node.val);

  return;
}
