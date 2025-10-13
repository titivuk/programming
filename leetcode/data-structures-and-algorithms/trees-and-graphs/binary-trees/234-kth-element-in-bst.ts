// https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

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

function kthSmallest_toSortedArray(root: TreeNode | null, k: number): number {
    const sortedValues: number[] = [];
    toSortedArr(root, sortedValues);

    return sortedValues.at(k - 1);
};

function toSortedArr(root: TreeNode | null, arr: number[]): number[] {
    // inroder recursive dfs to get sorted list of values
    if (!root) {
        return;
    }

    toSortedArr(root.left, arr);
    arr.push(root.val);
    toSortedArr(root.right, arr);
}


function kthSmallest(root: TreeNode | null, k: number): number {
    let kVal = 0;
    let step = 0;
    function dfs(root: TreeNode | null) {
        // inroder recursive dfs to get sorted list of values
        if (!root) {
            return;
        }

        dfs(root.left);

        step += 1;
        if (step === k) {
            kVal = root.val;
            return;
        }

        dfs(root.right);
    }

    dfs(root);
    return kVal;
};
