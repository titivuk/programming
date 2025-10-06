
/**
 * brute force
 * TLE
 */
function trap_bruteforce(height: number[]): number {
    let water = 0;

    for (let c = 0; c < height.length; c++) {
        // for every cell calculate maximum and "wall" from both sides
        let lMax = 0;
        if (c > 0) {
            lMax = Math.max(...height.slice(0, c))
        }
        let rMax = 0;
        if (c + 1 < height.length) {
            rMax = Math.max(...height.slice(c + 1))
        }


        // water cannot be higher than minimum wall
        // 
        //        |
        // |000000|
        // |000000|
        let minHeight = Math.min(lMax, rMax);

        // if given column do not have anything, then it contains minHeight water
        // however, since it has its own height, contained water minHeight minus column height
        // it can be negative since columnHeight can be greater than minHeight
        //   |
        // |0| <- 2 - 1 = 1 water
        // |x| <- occupied by column own height
        water += Math.max(minHeight - height[c], 0);
    }

    return water;
};

/**
 * precalculate max wall for one side
 * and calculate the other side on the fly
 */
function trap(height: number[]): number {
    let water = 0;

    // for every height[i], precalculate right side max wall
    let max = 0;
    let maxHeight: number[] = new Array(height.length).fill(0);
    for (let c = height.length - 2; c >= 0; c--) {
        max = Math.max(max, height[c + 1]);
        maxHeight[c] = max;
    }

    let lMax = 0;
    let rMax = 0;
    // does not make sense to check first and last column
    // they do not have left or right walls
    for (let c = 1; c < height.length - 1; c++) {
        // for every cell calculate left side max wall on the fly
        lMax = Math.max(lMax, height[c - 1]);
        // use precalculated value
        rMax = maxHeight[c];

        // water cannot be higher than minimum wall
        // 
        //        |
        // |000000|
        // |000000|
        let minHeight = Math.min(lMax, rMax);

        // if given column do not have anything, then it contains minHeight water
        // however, since it has its own height, contained water minHeight minus column height
        // it can be negative since columnHeight can be greater than minHeight
        //   |
        // |0| <- 2 - 1 = 1 water
        // |x| <- occupied by column own height
        water += Math.max(minHeight - height[c], 0);
    }

    return water;
};