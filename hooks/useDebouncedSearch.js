import { useState, useEffect } from "react";

/**
 * Custom hook for debounced search and fetching stock prices.
 * @param {string} initialValue Initial search query.
 * @param {number} delay Delay in milliseconds for debounce.
 */
export const useDebouncedSearch = (initialValue, delay) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      setLoading(true);
      if (searchTerm) {
        const data = await fetch(
          `https://app.albert.com/casestudy/stock/v2/search/?query=${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Albert-Case-Study-API-Key":
                "d2db5753-33f6-4e25-b915-6cbdda7953e7",
            },
          }
        )
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error fetching data: ", error);
            setResults([]);
          });

        const tickers = Object.keys(data).join(",");
        if (tickers) {
          await fetch(
            `https://app.albert.com/casestudy/stock/v2/prices/?tickers=${tickers}`,
            {
              method: "GET",
              headers: {
                "Albert-Case-Study-API-Key":
                  "d2db5753-33f6-4e25-b915-6cbdda7953e7",
              },
            }
          )
            .then((response) => response.json())
            .then((pricesData) => {
              const updatedResults = Object.keys(pricesData).map((ticker) => ({
                ticker,
                name: data[ticker],
                price: pricesData[ticker].price,
                lastClose: pricesData[ticker]["last_close"],
              }));
              setResults(updatedResults);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
              setResults([]);
            });
        } else {
          setResults([]);
        }
      } else {
        setResults([]);
      }

      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return { searchTerm, setSearchTerm, results, isLoading };
};
