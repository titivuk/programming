function minDays(bloomDay: number[], m: number, k: number): number {
  function check(days: number) {
    let bouquets = 0;

    let sequence = 0;
    for (let i = 0; i < bloomDay.length; i += 1) {
      if (bloomDay[i] > days) {
        bouquets += Math.floor(sequence / k);
        sequence = 0;
      } else {
        sequence += 1;
      }
    }

    bouquets += Math.floor(sequence / k);

    return bouquets >= m;
  }

  if (bloomDay.length < m * k) {
    return -1;
  }

  let left = 0,
    right = Math.max(...bloomDay),
    mid = 0;

  let answer = 0;
  while (left < right) {
    mid = Math.floor((left + right + 1) / 2);

    if (check(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return answer;
}

minDays([1, 10, 3, 10, 2], 3, 1);
