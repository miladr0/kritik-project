export function uniqueRandomCountries(countries, elementsNeed) {
  const countriesClone = [...countries];
  const randomCountries = [];

  if (elementsNeed > countries.length) {
    return null;
  }

  for (let i = 0; i < elementsNeed; i++) {
    const countryIndex = Math.floor(Math.random() * countriesClone.length);
    randomCountries.push(countriesClone[countryIndex]);

    countriesClone.splice(countryIndex, 1);
  }

  return randomCountries;
}
