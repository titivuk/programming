// https://leetcode.com/problems/find-closest-number-to-zero/description/
package main

import "math"

func main() {}

func findClosestNumber(nums []int) int {
	closest := math.MaxInt
	closestAbs := math.MaxInt

	var nAbs int
	for _, n := range nums {
		nAbs = int(math.Abs(float64(n)))

		if nAbs < closestAbs || (nAbs == closestAbs && n > closest) {
			closest = n
			closestAbs = nAbs
		}
	}

	return closest
}
