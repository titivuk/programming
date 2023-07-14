import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/dota2-senate/description/

// https://leetcode.com/problems/dota2-senate/solutions/3483399/simple-diagram-explanation/

function predictPartyVictory(senate: string): string {
  // every queue holds senate indexes of corresponding parties
  const radiantQueue: number[] = [];
  const direQueue: number[] = [];

  // fill the queues
  for (let i = 0; i < senate.length; i++) {
    if (senate[i] === "D") {
      direQueue.push(i);
    } else {
      radiantQueue.push(i);
    }
  }

  // offset is used as index when senator is banned
  let offset = senate.length;
  // voting continues until there are no senators left from one of the parties
  while (radiantQueue.length > 0 && direQueue.length > 0) {
    // if senator index less than another senator index - he bans first
    if (radiantQueue[0] < direQueue[0]) {
      radiantQueue.push(offset);
    } else {
      direQueue.push(offset);
    }

    offset += 1;

    // after one of the senators voted - remove them from the queues
    radiantQueue.shift();
    direQueue.shift();
  }

  if (direQueue.length === 0) {
    return "Radiant";
  }

  return "Dire";
}

deepStrictEqual(predictPartyVictory("RD"), "Radiant");
deepStrictEqual(predictPartyVictory("RDD"), "Dire");
