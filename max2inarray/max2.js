const THRESHOLD_LEN = 2

const max2 = (array = []) => {
    const { length } = array
    if ( length < THRESHOLD_LEN ) {
        console.log("Length of Array should be larger than 2")
        return
    }

    let [maxValue, secondMaxValue] = array[0] > array[1] ?  [array[0], array[1]] : [array[1], array[0]]

    if ( length === THRESHOLD_LEN ) {
        console.log(`${maxValue} ${secondMaxValue}`)
        return
    }

    for (const currentValue of array) {
        if (maxValue < currentValue) {
            secondMaxValue = maxValue
            maxValue = currentValue
        } else if (secondMaxValue < currentValue) {
            secondMaxValue = currentValue
        }
    }

    console.log(`${maxValue} ${secondMaxValue}`)
    return
}

[
    [2,5,1,6,0,-2,5,9,3]
].map(e => max2(e))