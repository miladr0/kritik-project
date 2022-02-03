import { useQuery } from 'react-query';
import { getAllCountries, getCountryDetail } from '../../api/countries';
import { ALL_COUNTRIES_KEY, COUNTRY_NAME_KEY } from '../../constants/queryKeys';

export const CountryDetail = async (countryName) => {
  return getCountryDetail(countryName).then((res) => res.data);
};

export function GetAllCountries() {
  return useQuery(ALL_COUNTRIES_KEY, async () => {
    return getAllCountries().then((res) => res.data);
  });
}
