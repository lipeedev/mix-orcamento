export function adjustMeasureToFive(value: number) {
    return Number((Math.ceil(value / 0.05) * 0.05).toFixed(2))
}