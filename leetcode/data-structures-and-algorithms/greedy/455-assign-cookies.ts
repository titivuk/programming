// https://leetcode.com/problems/assign-cookies/

function findContentChildren(g: number[], s: number[]): number {
  // start from grediest child by sorting g in DESC order
  g.sort((a, b) => b - a);
  // sort cookies in ASC order in order to use it as stack with the biggest cookies on the top
  s.sort((a, b) => a - b);

  let answer = 0;
  for (let i = 0; i < g.length && s.length > 0; i++) {
    // if greediest child satisfied by biggest cookies - increment answer and pop cookie from the stack
    // else the child cannot be satisfied with the cookies and we mvoe to the next child
    if (g[i] <= s[s.length - 1]) {
      answer += 1;
      s.pop();
    }
  }

  return answer;
}
