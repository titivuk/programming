import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/706/stacks-and-queues/4610/

// Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

// In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

// The canonical path should have the following format:

// The path starts with a single slash '/'.
// Any two directories are separated by a single slash '/'.
// The path does not end with a trailing '/'.
// The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')
// Return the simplified canonical path.

function simplifyPath(path: string): string {
  const stack: string[] = [];

  // split path by "/""
  // if there path = "/" pathArr = ["", "", ""]
  const pathArr = path.split("/");

  for (const item of pathArr) {
    // add "/" before every item
    if (stack.at(-1) !== "/") {
      stack.push("/");
    }

    // move to upper folder
    // we need to remove 2 items
    // item #1 - "/" - splits folders/files in path
    // item #2 - folder name
    // /a/b/c/.. -> /a/b/
    if (item === "..") {
      stack.pop();
      stack.pop();
    }
    // empty string "" appears because of .split("/") if
    //  1. path starts or ends with "/" char
    //  2. there are consequtive "/" chars and "" - tokens between them
    // we don't need to do anything about them
    // also we don't care about "." because it represents the same folder
    else if (item !== "" && item !== ".") {
      stack.push(item);
    }
  }

  // if last item is "/" - remove it
  if (stack.at(-1) === "/") {
    stack.pop();
  }

  // if stack is empty - simplified path = "/"
  if (stack.length === 0) {
    stack.push("/");
  }

  return stack.join("");
}

strictEqual(simplifyPath("/home/"), "/home");
strictEqual(simplifyPath("/../"), "/");
strictEqual(simplifyPath("/home//foo/"), "/home/foo");
strictEqual(simplifyPath("/a/./b/../../c/"), "/c");
strictEqual(simplifyPath("/a/../../b/../c//.//"), "/c");
strictEqual(simplifyPath("/abc/..."), "/abc/...");
