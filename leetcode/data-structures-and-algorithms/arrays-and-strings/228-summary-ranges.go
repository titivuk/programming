package main

import (
	"fmt"
	"strconv"
)

func summaryRanges(nums []int) []string {
	ranges := make([]string, 0)

	rangeStart := 0
	for rangeStart < len(nums) {
		rangeEnd := rangeStart
		for rangeEnd < len(nums) && nums[rangeEnd]-nums[rangeStart] == rangeEnd-rangeStart {
			rangeEnd++
		}
		rangeEnd--

		if rangeStart == rangeEnd {
			ranges = append(ranges, strconv.FormatInt(int64(nums[rangeStart]), 10))
		} else {
			ranges = append(ranges, fmt.Sprintf("%d->%d", nums[rangeStart], nums[rangeEnd]))
		}

		rangeStart = rangeEnd + 1
	}

	return ranges
}
