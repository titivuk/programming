// https://leetcode.com/problems/earliest-possible-day-of-full-bloom/description/

function earliestFullBloom(plantTime: number[], growTime: number[]): number {
  let flowers: number[][] = [];
  for (let i = 0; i < plantTime.length; i++) {
    flowers[i] = [plantTime[i], growTime[i]];
  }

  // flowers should be planted in plantTime DESC order
  flowers.sort((a, b) => b[1] - a[1]);

  let totalTime = 0,
    // time spent to plant previous flowers
    delay = 0;

  for (const [plantTime, growTime] of flowers) {
    // accumulate time spent planting
    delay += plantTime;
    totalTime = Math.max(totalTime, delay + growTime);
  }

  return totalTime;
}

function earliestFullBloomGrowFirst(
  plantTime: number[],
  growTime: number[]
): number {
  // https://leetcode.com/problems/earliest-possible-day-of-full-bloom/solutions/1676837/grow-then-plant/

  let flowers: number[][] = [];
  for (let i = 0; i < plantTime.length; i++) {
    flowers[i] = [plantTime[i], growTime[i]];
  }

  // Imagine all flowers grow first (by themself), and then you need to start planting.
  // You start by planting the flower that "grew" first, then you plant the next flower that "grew", and so on.
  flowers.sort((a, b) => a[1] - b[1]);

  let totalTime = 0;

  for (const [plantTime, growTime] of flowers) {
    totalTime = Math.max(growTime, totalTime) + plantTime;
  }

  return totalTime;
} 
