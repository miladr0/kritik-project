import React from 'react';

export default function Neighbors({ neighbors }) {
  if (neighbors?.length === 0) {
    return <p className="text-rose-500">No grouping found.</p>;
  }
  return (
    <ul className="list-decimal mt-3">
      {neighbors?.length && neighbors.map((neighbor, i) => <li key={i}>{neighbor}</li>)}
    </ul>
  );
}
