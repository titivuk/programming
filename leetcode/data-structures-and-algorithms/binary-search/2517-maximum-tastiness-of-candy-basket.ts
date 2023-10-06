// https://leetcode.com/problems/maximum-tastiness-of-candy-basket/description/

function maximumTastiness(price: number[], k: number): number {
  // sort array for check function
  price.sort((a, b) => a - b);

  function check(tastiness: number): boolean {
    // the 1st element is picked by default
    let numberOfCandies = 1;
    let lastCandyIndex = 0;

    // start from the 2nd element
    for (let i = 1; i < price.length; i += 1) {
      // if curr element differs from last added element more than tastiness
      if (price[i] - price[lastCandyIndex] >= tastiness) {
        // add the element to the basket
        numberOfCandies += 1;
        // and remember curr element
        lastCandyIndex = i;
      }
    }

    // if at least k elements found with distance between each other >= k -> tastiness is valid
    return numberOfCandies >= k;
  }

  let left = 0,
    right = price[price.length - 1] - price[0],
    mid = 0;

  while (left < right) {
    mid = Math.floor((left + right + 1) / 2);

    if (check(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

maximumTastiness([13, 5, 1, 8, 21, 2], 3);
