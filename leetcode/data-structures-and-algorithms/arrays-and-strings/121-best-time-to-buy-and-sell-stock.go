package main

import "math"

func maxProfit(prices []int) int {
	minPastPrice := math.MaxInt

	bestProfit := 0
	todayProfit := 0
	for _, todayPrice := range prices {
		todayProfit = todayPrice-minPastPrice

		if bestProfit < todayProfit {
			bestProfit = todayPrice - minPastPrice
		}

		if minPastPrice > todayPrice {
			minPastPrice = todayPrice
		}
	}

	return bestProfit
}
