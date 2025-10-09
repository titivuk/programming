## Binary Search

1. Declare `left = 0` and `right = arr.length - 1`. These variables represent the inclusive bounds of the current search space at any given time. Initially, we consider the entire array.
2. While `left <= right`
   - Calculate the middle of the current search space, `mid = (left + right) / 2` (floor division)
   - check `arr[mid]`. There are 3 possibilities:
     - If `arr[mid] = x`, then the element has been found, return
     - If `arr[mid] > x`, then halve the search space by doing `right = mid - 1`
     - If `arr[mid] < x`, then halve the search space by doing `left = mid + 1`
3. If you get to this point without `arr[mid] = x`, then search was unsuccessful. The `left` pointer will be at the index where `x` would need to be inserted to maintain `arr` being sorted

## On Solution Spaces

Type of problem is `what is the max/min that something can be done`

1. You can quickly (in O(n) or better) verify if the task is possible for a given number `x`.
2. If the task is possible for a number `x`, and you are looking for:
    - A maximum, then it is also possible for all numbers less than `x`.
    - A minimum, then it is also possible for all numbers greater than `x`.
3. If the task is not possible for a number `x`, and you are looking for:
    - A maximum, then it is also impossible for all numbers greater than `x`.
    - A minimum, then it is also impossible for all numbers less than `x`.

If a problem is asking for **minimum**, then the answer is `left`
If a problem is asking for **maximum**, then the answer is `right`

### Prove

Let's say we're looking for a minimum and the answer is `x`. After doing `check(x)`, we set `right = x - 1` because `check(x)` will return true, and we move the right bound to look for a better answer. As you can see, the correct answer is actually outside of our search space now. That means every future iteration of `check` is going to fail, which means we will continuously increase `left` until eventually we try `check(x - 1)`. This will fail and set `left = (x - 1) + 1 = x`. Our while loop terminates because `left > right`, and `left` is at the answer.

If we are instead looking for a maximum, after performing `check(x)`, we set `left = x + 1`. Again, the correct answer is outside of the search space and all future checks will fail. Eventually, we try `check(x + 1)`, fail, and set `right = (x + 1) - 1 = x`. The loop terminates because `right < left`, and `right` is pointing at the answer.