const generateKey = require('../modules/generateKey');

describe('Testing generateKey', () => {
  test(`Keys must not include numbers`, () => {
    expect(generateKey(10)).toEqual(expect.not.stringMatching(/[0 - 9]/));
  });

  test(`Keys must be of the specified length`, () => {
    expect(generateKey(12)).toHaveLength(12);
  });
});
