// https://leetcode.com/problems/balanced-binary-tree/description/

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

function isBalanced(root: TreeNode | null): boolean {
    if (!root) {
        return true;
    }

    let ld = depth(root.left);
    let rd = depth(root.right);

    if (ld === -1 || rd === -1 || Math.abs(rd - ld) > 1) {
        return false;
    }

    return true;
};

function depth(node: TreeNode | null): number {
    if (!node) {
        return 0;
    }

    let ld = depth(node.left);
    if (ld === -1) return -1;

    let rd = depth(node.right);
    if (rd === -1) return -1;

    if (Math.abs(rd - ld) > 1) {
        return -1;
    }

    return Math.max(ld, rd) + 1;
}