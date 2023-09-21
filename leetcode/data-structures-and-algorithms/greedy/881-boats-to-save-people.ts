import { strictEqual } from "assert";

function numRescueBoats(people: number[], limit: number): number {
  // try to put lightest and heaviest person in the same boat
  // if they do not fit - just put heaviest person in the boat alone

  // use two-pointers technique to track current lightest and heaviest persons
  let light = 0,
    heavy = people.length - 1;

  // sort people ASC so heaviest person in the end
  people.sort((a, b) => a - b);

  let answer = 0;
  while (light <= heavy) {
    answer += 1;

    // if heaviest and lightest person cannot fit the boat
    // heaviest goes alone
    if (people[light] + people[heavy] <= limit) {
      light += 1;
    }

    heavy -= 1;
  }

  return answer;
}

strictEqual(numRescueBoats([3, 2, 2, 1], 3), 3);
