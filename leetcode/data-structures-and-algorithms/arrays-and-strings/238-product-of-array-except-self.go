package main

func productExceptSelf(nums []int) []int {
	l := len(nums)
	result := make([]int, l)

	// like prefix-sum, but product and from both sides

	// calculate left-side product
	sideProduct := 1
	for i := 0; i < l; i++ {
		result[i] = sideProduct
		sideProduct *= nums[i]
	}

	// calculate right-side product
	sideProduct = 1
	for i := l - 1; i >= 0; i-- {
		// result already stores left-side product for i-th num
		// so just multiply to get final product from both sides
		result[i] *= sideProduct
		sideProduct *= nums[i]
	}

	return result
}
