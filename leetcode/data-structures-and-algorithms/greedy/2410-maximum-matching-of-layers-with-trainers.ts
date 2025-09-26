// https://leetcode.com/problems/maximum-matching-of-players-with-trainers/

function matchPlayersAndTrainers(
  players: number[],
  trainers: number[]
): number {
  // start from players with the highest abilities by sorting players in DESC order
  players.sort((a, b) => b - a);
  // sort trainers in ASC order in order to use it as stack with the biggest capacity on the top
  trainers.sort((a, b) => a - b);

  let answer = 0;
  for (let i = 0; i < players.length && trainers.length > 0; i++) {
    // if player with the biggiest ability satisfied by biggest trainer - increment answer and pop the trainer from the stack
    // else the player cannot be satisfied with the trainer and we move to the next player
    if (players[i] <= trainers[trainers.length - 1]) {
      answer += 1;
      trainers.pop();
    }
  }

  return answer;
}
