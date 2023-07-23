Input formats:

- Arrays of edges
- Adjacency list - список смежности
- Adjacency matrix - матрица смежности
- Matrix

### BFS usage
There are some problems where using BFS is clearly better than using DFS. In trees, this was the case when we were concerned with tree levels. In graphs, it is mostly the case when you are asked to find the shortest path.

BFS on trees visited the nodes **according to their distance from the root**.

BFS on a graph always visits nodes according to their distance from the starting point. This is the key idea behind BFS on graphs - **every time you visit a node**, you must have reached it in the minimum steps possible from wherever you started your BFS.