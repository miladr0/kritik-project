import React, { useState } from 'react';
import './App.css';
import { GetAllCountries, CountryDetail } from './hooks/reactQuery';
import { uniqueRandomCountries } from './utils/randomUtils';
import CountriesList from './components/CountriesList';
import Neighbors from './components/Neighbors';

function App() {
  const allCountries = GetAllCountries();

  const [loading, setLoading] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [neighbors, setNeighbors] = useState(null);

  const groupingHandler = async () => {
    if (allCountries?.data?.length) {
      const uniqueCountries = uniqueRandomCountries(allCountries.data, 10);
      setSelectedCountries(uniqueCountries);
      setLoading(true);

      try {
        // fetch 10 random country with detail
        const countriesWithDetail = await Promise.all(
          uniqueCountries.map((c) => CountryDetail(c.name))
        );

        const mutuals = [];
        for (let i = 0; i < countriesWithDetail.length; i++) {
          const country = countriesWithDetail[i];

          if (country) {
            countriesWithDetail.forEach((countryForSearch, index) => {
              if (country.names.name !== countryForSearch.names.name) {
                if (
                  countryForSearch.neighbors.some(
                    (neighbor) => neighbor.name === country.names.name
                  ) &&
                  country.neighbors.some(
                    (neighbor) => neighbor.name === countryForSearch.names.name
                  )
                ) {
                  mutuals.push(`${country.names.name}  ${countryForSearch.names.name}`);

                  countriesWithDetail.splice(i, 1);
                  countriesWithDetail.splice(index, 1);
                }
              }
            });
          }
        }

        setNeighbors(mutuals);
        setLoading(false);
      } catch (err) {
        console.log('err: ', err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center w-full h-full p-4">
      <button
        className="w-48 px-4 py-2 font-semibold text-base bg-cyan-500 text-white rounded-full shadow-sm"
        onClick={groupingHandler}
      >
        {loading ? 'loading...' : 'Generate Groupings'}
      </button>

      <h1 className="text-3xl font-bold underline pt-3">Selected Countries</h1>

      <CountriesList countries={selectedCountries} />

      <h2 className="text-3xl font-bold underline mt-3">Neighbors</h2>

      <Neighbors neighbors={neighbors} />
    </div>
  );
}

export default App;
