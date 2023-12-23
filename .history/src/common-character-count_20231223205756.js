const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const freq1 = getCharacterFrequency(s1);
  const freq2 = getCharacterFrequency(s2);

  let commonCount = 0;

  // Iterate through one of the frequency objects
  for (const char in freq1) {
    if (freq2[char]) {
      // Count the number of common characters by finding the minimum frequency
      commonCount += Math.min(freq1[char], freq2[char]);
    }
  }

  return commonCount;
}

module.exports = {
  getCommonCharacterCount
};
