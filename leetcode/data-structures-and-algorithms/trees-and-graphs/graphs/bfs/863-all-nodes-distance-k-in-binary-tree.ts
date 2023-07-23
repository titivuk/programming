// https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/

import { TreeNode } from "../../binary-trees/tree-node.js";

// Given the root of a binary tree, the value of a target node target, and an integer k, return an currentLvlVertices of the values of all nodes that have a distance k from the target node.
// You can return the answer in any order.

function distanceK(
  root: TreeNode | null,
  target: TreeNode | null,
  k: number
): number[] {
  if (!target) {
    return [];
  }

  // convert binary tree to graph by adding reference to parent (make it undirected)
  // and start from "target" vertice
  // in js we could just go trough the tree and add new property called "parent"
  // but since we use typescript, we "can't" add property that does not exist to TreeNode type
  // so for every node we store it's parent
  const parents = new Map<TreeNode, TreeNode>();

  function setParentsUsingDfs(
    node: TreeNode | null,
    prevNode: TreeNode | null
  ) {
    if (!node) {
      return;
    }

    if (prevNode) {
      parents.set(node, prevNode);
    }

    setParentsUsingDfs(node.left, node);
    setParentsUsingDfs(node.right, node);

    return node;
  }

  setParentsUsingDfs(root, null);

  // apply regular graph BFS
  let currentLvlVertices: TreeNode[] = [target];
  let nextLvlVertices: TreeNode[] = [];
  // set target visited
  const visited = new Set<TreeNode>([target]);

  let distance = 0;
  while (currentLvlVertices.length > 0 && distance < k) {
    for (const vertice of currentLvlVertices) {
      if (vertice.left && visited.has(vertice.left) === false) {
        visited.add(vertice.left);
        nextLvlVertices.push(vertice.left);
      }

      if (vertice.right && visited.has(vertice.right) === false) {
        visited.add(vertice.right);
        nextLvlVertices.push(vertice.right);
      }

      let parent = parents.get(vertice);
      if (parent && visited.has(parent) === false) {
        visited.add(parent);
        nextLvlVertices.push(parent);
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    distance += 1;
  }

  return currentLvlVertices.map((vertice) => vertice.val);
}
