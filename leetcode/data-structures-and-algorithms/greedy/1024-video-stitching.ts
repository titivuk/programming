function videoStitching(clips: number[][], time: number): number {
  // sort values by startTime and if startTime is the same - order by endTime DESC
  // sort is inversed because we want to use array as stack and pop values in O(1)
  // so we start from the end
  clips.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }

    return b[0] - a[0];
  });

  // if smallest startTime not equal to 0
  // we cannot covert 0...1 second
  if (clips[clips.length - 1][0] !== 0) {
    return -1;
  }

  let answer = 1;
  let latestClipEndTime = clips[clips.length - 1][1];
  clips.pop();

  let currClipEndTime = 0;
  while (clips.length > 0 && latestClipEndTime < time) {
    currClipEndTime = 0;

    // we take every clip that starts before lattest clip ends and choose largest end time
    while (
      clips.length > 0 &&
      clips[clips.length - 1][0] <= latestClipEndTime
    ) {
      currClipEndTime = Math.max(currClipEndTime, clips.pop()![1]);
    }

    // if we dod not find any clip
    // it means there is a hole in the time
    if (currClipEndTime === 0) {
      return -1;
    }

    latestClipEndTime = currClipEndTime;
    answer += 1;
  }

  if (latestClipEndTime < time) {
    return -1;
  }

  return answer;
}
