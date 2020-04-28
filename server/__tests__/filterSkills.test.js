const filterSkills = require('../modules/filterSkills');

describe('Testing filterSkills', () => {
  test(`Should be able to parse by skill name`, () => {
    expect(filterSkills('I need help with my windows computer')).toEqual(
      expect.arrayContaining(['win'])
    );
  });

  test(`Should be able to parse by skill synonym`, () => {
    expect(filterSkills('I need help with my macintosh')).toEqual(
      expect.arrayContaining(['mac'])
    );
  });

  test(`Should be able to parse by skill generic name`, () => {
    expect(filterSkills('I need help with my samsung phone')).toEqual(
      expect.arrayContaining(['and'])
    );
  });

  test(`Should be able to parse by skill related term`, () => {
    expect(filterSkills('I need help with netflix')).toEqual(
      expect.arrayContaining(['tvs'])
    );
  });
});
