A heap is a container that stores elements, and supports the following operations:

- Add an element in O(logn)
- Remove the minimum element in O(logn)
- Find the minimum element in O(1)


- Binary heap implements binary tree, but with only an array, where array[0] - root, array[1] and array[2] - root's children. Or, more generally, for node[i] children are array[2i+1] array[2i+2]
- If you need increasing (decreasing) heap but you have decreasing (increasing) heap, you can multiply all values by -1.
- Heap is not implemented in Javascript
