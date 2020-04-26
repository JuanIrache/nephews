const formatHTML = require('../modules/formatHTML');

describe('Testing formatHTML', () => {
  test(`Should be able to format an HTML page with a title`, () => {
    expect(formatHTML({ title: 'This goes inside h1' })).toEqual(
      expect.stringContaining('<h1>This goes inside h1</h1>')
    );
  });

  test(`Should be able to format an HTML page with a link`, () => {
    expect(formatHTML({ link: { text: 'Content', url: 'url' } })).toEqual(
      expect.stringContaining(
        '<a style="color:#003146" href="url">\nContent\n</a>'
      )
    );
  });

  test(`Should be able to format an HTML page with an audio tag`, () => {
    expect(formatHTML({ audio: 'audio_link' })).toEqual(
      expect.stringContaining(
        '<audio controls src="audio_link" style="width:80%;">\nYour browser does not support the audio element.\n</audio>'
      )
    );
  });
});
