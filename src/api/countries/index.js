import client from '../client';

export const getAllCountries = () => {
  return client.get('/countries.json');
};

export const getCountryDetail = (countryName) => {
  return client.get(`/${countryName}?format=json`);
};
