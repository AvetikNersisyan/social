export const escapeQuotes = (str) => {
  if (typeof str !== 'string') {
    return str;
  }

  return  str.replaceAll('\'', '\'\'')
};
