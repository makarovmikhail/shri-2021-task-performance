/**
 * Calculates sum of Fibonacci sequence up to n
 * @param {number} num max value of Fibonacci sequence
 * @returns sum of Fibonacci sequence from 1 to n
 */
export function getFibonacciSum(n) {
  let a = 0;
  let b = 1;
  let sum = 0;
  for (let i = 1; i < n; ++i) {
     let c = a + b;
     a = b;
     b = c;
     sum += a;
  }
  return sum;
}
