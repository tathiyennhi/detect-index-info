const normalizeString = function (line) {
  const fixData = line.slice(0, -1);
  const arraySplit = fixData.split("\x01");
  arraySplit[arraySplit.length - 1] = arraySplit[arraySplit.length - 1].replace(/\r/g, '');
  return arraySplit;
};

module.exports = { normalizeString };
