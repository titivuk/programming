import { deepStrictEqual } from "assert";

/**
 * @description two pointers technique
 */
function reverseString(arr: string[]) {
  let left = 0,
    right = arr.length - 1;

  let tmp = "";
  while (left < right) {
    // who let him cook...
    // [arr[left], arr[right]] = [arr[right], arr[left]];

    tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;

    left++;
    right--;
  }
}

let arr1 = ["h", "e", "l", "l", "o"];
reverseString(arr1);
deepStrictEqual(arr1, ["o", "l", "l", "e", "h"]);

let arr2 = ["H", "a", "n", "n", "a", "h"];
reverseString(arr2);
deepStrictEqual(arr2, ["h", "a", "n", "n", "a", "H"]);
