import { useState, useEffect } from "react";

const useStockPrices = (watchlist) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const tickers = watchlist.map((stock) => stock.ticker).join(",");
        if (tickers) {
          const response = await fetch(
            `https://app.albert.com/casestudy/stock/v2/prices/?tickers=${tickers}`,
            {
              method: "GET",
              headers: {
                "Albert-Case-Study-API-Key":
                  "d2db5753-33f6-4e25-b915-6cbdda7953e7",
              },
            }
          );
          const data = await response.json();
          setPrices(data);
        }
      } catch (error) {
        console.error("Failed to fetch stock prices:", error);
      }
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 5000);

    return () => clearInterval(intervalId);
  }, [watchlist]);

  return prices;
};

export default useStockPrices;
