import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/sum-of-subarray-ranges/

function sumSubarrayMins(arr: number[]): number {
  let sum = 0;

  // having increasing stack we can get
  // 1. index of the previous element that less than current element
  // 2. index of the next element that less that current element
  // 3. in between those indexes curr element is the min possible value and we can calculate number of subarrays
  //    where the current element is MIN
  const increasingStack: number[] = [];
  let currMinElementIndex = -1,
    prevLessElementIndex = -1,
    nextLessElementIndex = arr.length;

  for (let i = 0; i < arr.length; i++) {
    while (
      increasingStack.length > 0 &&
      arr[increasingStack.at(-1) as number] > arr[i]
    ) {
      currMinElementIndex = increasingStack.pop() as number;
      // prevLessElementIndex  = stack.at(-1) - index of the previous element that less than stack.at(-1)
      // nextLessElementIndex = i - index of next element that less than stack.at(-1)
      prevLessElementIndex = increasingStack.at(-1) ?? -1;
      nextLessElementIndex = i;

      // number_of_sub_arrays = (prevLessElementIndex, currMinElementIndex] * [currMinElementIndex, nextLessElementIndex) - proven by someone so just take it as it is
      sum +=
        arr[currMinElementIndex] *
        (currMinElementIndex - prevLessElementIndex) *
        (nextLessElementIndex - currMinElementIndex);
    }

    increasingStack.push(i);
  }

  // if stack is not empty - it means that there is a sequence of values left and every next value is greater than another
  // which means that rightIndex = arr.length
  if (increasingStack.length > 0) {
    // do the same logic as before but nextLessElementIndex = arr.length always
    nextLessElementIndex = arr.length;

    while (increasingStack.length > 0) {
      currMinElementIndex = increasingStack.pop() as number;
      prevLessElementIndex = increasingStack.at(-1) ?? -1;

      sum +=
        arr[currMinElementIndex] *
        (currMinElementIndex - prevLessElementIndex) *
        (nextLessElementIndex - currMinElementIndex);
    }
  }

  return sum % (1e9 + 7);
}

deepStrictEqual(sumSubarrayMins([3, 1, 2, 4]), 17);
deepStrictEqual(sumSubarrayMins([11, 81, 94, 43, 3]), 444);
