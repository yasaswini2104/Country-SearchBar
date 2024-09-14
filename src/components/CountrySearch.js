import React, { useState, useEffect } from "react";
import countries from "../data/countries.json"; // Import the JSON data

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CountrySearch = () => {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredCountries([]);
      return;
    }

    const lowercasedQuery = debouncedQuery.toLowerCase();

    const results = countries.filter((country) => {
      const countryNameMatch = country.country.toLowerCase().includes(lowercasedQuery);
      const capitalMatch = country.capital.toLowerCase().includes(lowercasedQuery);
      const currencyMatch = country.currency.toLowerCase().includes(lowercasedQuery);
      const languageMatch = Array.isArray(country.official_language)
        ? country.official_language.some((lang) =>
            lang.toLowerCase().includes(lowercasedQuery)
          )
        : country.official_language.toLowerCase().includes(lowercasedQuery);

      return countryNameMatch || capitalMatch || currencyMatch || languageMatch;
    });

    setFilteredCountries(results);
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const highlightText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) => (
      <span key={i} style={{ fontWeight: part.toLowerCase() === query.toLowerCase() ? "bold" : "normal" }}>
        {part}
      </span>
    ));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country, capital, currency, or language..."
        value={query}
        onChange={handleInputChange}
        style={{ padding: "10px", width: "100%", fontSize: "16px" }}
      />

      {filteredCountries.length === 0 && query && <p>No results found</p>}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredCountries.map((country) => (
          <li key={country.country} style={{ padding: "10px", margin: "10px 0", border: "1px solid #ccc" }}>
            <div>
              <strong>Country: </strong>
              {highlightText(country.country, debouncedQuery)}
            </div>
            <div>
              <strong>Capital: </strong>
              {highlightText(country.capital, debouncedQuery)}
            </div>
            <div>
              <strong>Population: </strong>
              {country.population.toLocaleString()}
            </div>
            <div>
              <strong>Official Language(s): </strong>
              {Array.isArray(country.official_language)
                ? country.official_language.join(", ")
                : country.official_language}
            </div>
            <div>
              <strong>Currency: </strong>
              {highlightText(country.currency, debouncedQuery)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySearch;
