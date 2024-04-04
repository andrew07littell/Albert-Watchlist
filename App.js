import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch";
import useWatchlist from "./hooks/useWatchlist";
import useStockPrices from "./hooks/useStockPrices";
import StockItem from "./components/StockItem";
import EmptyDataComponent from "./components/EmptyData";

const MainScreen = () => {
  const [displayMode, setDisplayMode] = useState("amount");
  const {
    searchTerm,
    setSearchTerm,
    results: stocks,
    isLoading,
  } = useDebouncedSearch("", 500);

  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const prices = useStockPrices(watchlist);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Search stocks ..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        mode="outlined"
        style={styles.searchBar}
      />
      {searchTerm ? (
        isLoading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={40}
          />
        ) : (
          <FlatList
            data={stocks}
            renderItem={({ item }) => (
              <StockItem
                item={item}
                setSearchTerm={setSearchTerm}
                displayMode={displayMode}
                isInWatchList={watchlist.some(
                  (stock) => stock.ticker === item.ticker
                )}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyDataComponent
                text="Your Search Result is currently empty."
                subtext="Try another search query."
              />
            )}
            keyExtractor={(item) => item.ticker}
            style={styles.list}
          />
        )
      ) : (
        <>
          <Text style={styles.watchlistTitle}>Watch List</Text>
          <FlatList
            data={watchlist}
            renderItem={({ item }) => (
              <StockItem
                item={item}
                displayMode={displayMode}
                updatedPrice={prices[item.ticker]}
                isInWatchList={watchlist.some(
                  (stock) => stock.ticker === item.ticker
                )}
                setSearchTerm={setSearchTerm}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyDataComponent
                text="Your Watch List is currently empty."
                subtext="Start adding stocks to see them here."
              />
            )}
            keyExtractor={(item) => item.ticker}
            style={styles.list}
          />
        </>
      )}
      {!isLoading && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => setDisplayMode("amount")}
            style={styles.toggleButton}
          >
            Amount
          </Button>
          <Button
            mode="contained"
            onPress={() => setDisplayMode("percent")}
            style={styles.toggleButton}
          >
            Percent
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  toggleButton: {
    marginHorizontal: 8,
  },
  watchlistTitle: {
    padding: 8,
    fontSize: 18,
    textAlign: "center",
  },
});

export default MainScreen;
