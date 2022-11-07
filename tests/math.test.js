const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math')


test('Should calculate total with provided tip!', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip!', () => {
    const total = calculateTip(10)
    expect(total).toBe(11)
})

test('Should convert from Celsius to Farenheit!', () => {
    const temp = celsiusToFahrenheit(0)
    expect(Math.round(temp)).toBe(32)
})

test('Should convert from Farenheit to Celsius!', () => {
    const temp = fahrenheitToCelsius(32)
    expect(Math.round(temp)).toBe(0)
})

test('Should perform an adding operation', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})