// https://leetcode.com/problems/search-a-2d-matrix/description/

function searchMatrix(matrix: number[][], target: number): boolean {
    for (let i = 0; i < matrix.length; i++) {
        let nums = matrix[i];

        let left = 0,
            right = nums.length - 1;

        let mid = 0;
        while (left <= right) {
            mid = Math.floor((left + right) / 2);

            if (target === nums[mid]) {
                return true;
            }

            if (target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }

    return false;
};