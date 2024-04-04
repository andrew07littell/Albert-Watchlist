import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const StockItem = ({
  item,
  updatedPrice,
  displayMode,
  setSearchTerm,
  isInWatchList,
  addToWatchlist,
  removeFromWatchlist,
}) => {
  let price = item.price;
  let lastClose = item.lastClose;
  if (updatedPrice) {
    price = updatedPrice.price;
    lastClose = updatedPrice["last_close"];
  }

  const priceChange = price - lastClose;
  const priceChangePercentage = (priceChange / lastClose) * 100;
  const priceChangeColor = priceChange >= 0 ? "green" : "red";

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Paragraph style={styles.ticker}>{item.ticker}</Paragraph>
        </View>
        {price ? (
          <>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={[styles.change, { color: priceChangeColor }]}>
              {displayMode === "amount"
                ? `Change: ${priceChange < 0 ? "-" : ""}$${Math.abs(
                    priceChange
                  ).toFixed(2)}`
                : `Change: ${priceChangePercentage.toFixed(2)}%`}
            </Text>
          </>
        ) : (
          <Text style={styles.price}> No Price </Text>
        )}
        <View style={styles.actionContainer}>
          {isInWatchList ? (
            <TouchableOpacity
              onPress={() => {
                removeFromWatchlist(item.ticker);
                setSearchTerm("");
              }}
            >
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                addToWatchlist(item);
                setSearchTerm("");
              }}
            >
              <Text style={styles.addButton}>Add to Watch List</Text>
            </TouchableOpacity>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    padding: 3,
    borderRadius: 10,
  },
  ticker: {
    fontSize: 14,
    color: "#616161",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  change: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  actionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addButton: {
    color: "blue",
    padding: 5,
    borderRadius: 5,
  },
  removeButton: {
    color: "crimson",
    padding: 5,
    borderRadius: 5,
  },
});

export default StockItem;
