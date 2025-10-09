// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

function findMin(nums: number[]): number {
    let left = 0,
        right = nums.length - 1;

    let mid = 0;
    while (left < right) {
        mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid
        }
    }

    return nums[left];
};
