let random = (min, max) => {
    if (min === undefined && max === undefined) {
        return Math.random()
    }
    // if one parameter is passed, assign it to lonelyPar
    let lonelyPar =
        min === undefined ? max : max === undefined ? min : undefined
    if (lonelyPar) {
        ;(min = 0), (max = lonelyPar)
    }
    if (min > max) {
        let temp = min
        min = max
        max = temp
    }
    return this.floor(Math.random() * (max - min + 1) + min)
}
