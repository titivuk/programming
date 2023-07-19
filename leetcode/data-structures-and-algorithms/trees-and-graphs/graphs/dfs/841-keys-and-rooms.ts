import { strictEqual } from "assert";

// https://leetcode.com/problems/keys-and-rooms/

// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.
// When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.
// Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

function canVisitAllRooms(rooms: number[][]): boolean {
  // rooms - adjacency list

  let visited = new Array<boolean>(rooms.length).fill(false);

  function dfs(room: number) {
    for (const adjacentRoom of rooms[room]) {
      // visit every possible room
      if (visited[adjacentRoom] === false) {
        visited[adjacentRoom] = true;
        dfs(adjacentRoom);
      }
    }
  }

  // start from 0th room
  visited[0] = true;
  dfs(0);

  // if every room is visited starting from 0th room
  // then every visited[i] = true for any i-th from [0, rooms.length - 1]
  return visited.every((visit) => visit);
}

strictEqual(canVisitAllRooms([[1], [2], [3], []]), true);
strictEqual(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]), false);
