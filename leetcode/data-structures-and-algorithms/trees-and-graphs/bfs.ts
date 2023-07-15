import { TreeNode } from "./tree-node.js";

function bfs(root: TreeNode | null) {
  if (!root) {
    return;
  }

  let currLvlNodes = [root];

  while (currLvlNodes.length) {
    let numberofCurrLvlNodes = currLvlNodes.length;
    // JavaScript doesn't support a built-in efficient queue,
    // but we can work around this by using a second array nextQueue to implement an efficient BFS.
    let nextLvlNodes: TreeNode[] = [];

    for (let i = 0; i < numberofCurrLvlNodes; i++) {
      // do logic here
      console.log(currLvlNodes[i].val);

      // put the next level onto the queue
      if (currLvlNodes[i].left) {
        nextLvlNodes.push(currLvlNodes[i].left!);
      }

      if (currLvlNodes[i].right) {
        nextLvlNodes.push(currLvlNodes[i].right!);
      }
    }

    currLvlNodes = nextLvlNodes;
  }

  return;
}
