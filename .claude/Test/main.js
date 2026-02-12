function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Invalid input: both arguments must be valid numbers.');
  }
  return a + b;
}

console.log(add(1, 2)); 