// https://leetcode.com/problems/valid-perfect-square/description/

function isPerfectSquare(num: number): boolean {
    let left = 1,
        right = num,
        mid = 0,
        mid2 = 0;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        mid2 = mid * mid;

        if (mid2 === num) {
            return true;
        }

        if (mid2 > num) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return false;
};