// https://leetcode.com/problems/boats-to-save-people

function numRescueBoats(people: number[], limit: number): number {
  people.sort((a, b) => a - b);

  let answer = 0;

  let light = 0,
    heavy = people.length - 1;

  while (light <= heavy) {
    // boat can carry 2 people
    if (people[light] + people[heavy] <= limit) {
      light++;
    }

    // 1 <= people[i] <= limit <= 3 * 10**4 - from constraints
    // boat carries at least heavy person
    heavy--;

    answer++;
  }

  return answer;
}
