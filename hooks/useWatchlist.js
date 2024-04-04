import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const savedWatchlist = await AsyncStorage.getItem("watchlist");
        if (savedWatchlist) {
          setWatchlist(JSON.parse(savedWatchlist));
        }
      } catch (error) {
        console.error("Failed to load the watchlist", error);
      }
    };

    loadWatchlist();
  }, []);

  useEffect(() => {
    const saveWatchlist = async () => {
      try {
        await AsyncStorage.setItem("watchlist", JSON.stringify(watchlist));
      } catch (error) {
        console.error("Failed to save the watchlist", error);
      }
    };

    saveWatchlist();
  }, [watchlist]);

  const addToWatchlist = (stock) => {
    if (!watchlist.some((item) => item.ticker === stock.ticker)) {
      setWatchlist((currentWatchlist) => [
        ...currentWatchlist,
        { name: stock.name, ticker: stock.ticker },
      ]);
    }
  };

  const removeFromWatchlist = (ticker) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((stock) => stock.ticker !== ticker)
    );
  };

  return { watchlist, addToWatchlist, removeFromWatchlist };
};

export default useWatchlist;
