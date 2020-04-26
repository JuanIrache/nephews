// Classify transcription based on the skill metadata

const skills = require('../data/skills');

// Find a matching term from an array in a text
const matchElement = (arr, transcription) => {
  for (const elt of arr) {
    const reElt = new RegExp(`\\b${elt.toLowerCase()}\\b`);
    if (reElt.test(transcription)) {
      return true;
    }
  }
  return false;
};

module.exports = transcription => {
  const filter = [];
  transcription = transcription.toLowerCase();

  // Try matching names first
  skills.forEach(s => {
    const reName = new RegExp(`\\b${s.name.toLowerCase()}\\b`);
    if (reName.test(transcription)) filter.push(s.code);
    else {
      // Then synonyms
      if (matchElement(s.synonyms, transcription)) filter.push(s.code);
    }
  });

  if (filter.length) return filter;

  // If no matches, try with generic names
  skills.forEach(s => {
    if (matchElement(s.generic, transcription)) filter.push(s.code);
  });

  if (filter.length) return filter;

  // If no matches, try with related terms
  skills.forEach(s => {
    if (matchElement(s.related, transcription)) filter.push(s.code);
  });

  if (filter.length) return filter;

  // Otherwise return an empty filter to match all volunteers
  return null;
};
