// testing function only, not react components
export const sumPositiveNumbers = (num1: number, num2: number) => {
  if ( num1 < 0 || num2 < 0) {
    throw new Error('One of the number is negative')
  } 
  return num1 + num2
}

// describe block - test context with multiple test cases inside of it
describe('when the arguments passes are positive numbers', () => {
  test('should return the right answer', () => {
    // Jest assertion - expect statement
    // expect gives you access to a number of "matchers" that let you validate different things
    expect(sumPositiveNumbers(4, 5)).toBe(9); // toBe is the matcher from jest
  })
})

describe('when one of the arguments is a negative number', () => {
  test('should throw an error', () => {
    let error;

    try {
      sumPositiveNumbers(-1, 5)
    } catch(e) {
      error = e;
    }
    // Use .toBeDefined to check that a variable is not undefined. 
    // For example, if you want to check that a function sumPositiveNumbers() returns something
    expect(error).toBeDefined()
    expect(error.message).toBe('One of the number is negative')
  })
})
