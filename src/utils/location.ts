const decode = decodeURIComponent;
export function parseQuery(queryString: string): { [query: string]: string } {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

  pairs.forEach(pair => {
    const splittedPair = pair.split('=');
    query[decode(splittedPair[0])] = decode(splittedPair[1] || '');
  });

  return query;
}
