import React from 'react';

export default function CountriesList({ countries }) {
  return (
    <ul className="list-disc mt-3">
      {countries?.map((country, i) => (
        <li key={i}>{country.name}</li>
      ))}
    </ul>
  );
}
