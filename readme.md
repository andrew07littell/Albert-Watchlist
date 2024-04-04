# Stock Watchlist App

A React Native application designed to allow users to create a personalized watchlist of stocks, view current stock prices, and receive real-time updates. This app integrates with a stock information API to fetch and display stock data.

## Features

- **Search for Stocks**: Users can search for stocks by name or ticker symbol.
- **Add/Remove Stocks**: Users can add stocks to their watchlist or remove them.
- **Real-time Price Updates**: Stock prices in the watchlist are updated every 5 seconds.
- **Price Change Indicator**: Stocks are highlighted in green if the current price is above the last close price, or red if below.
- **Toggle Price Change Display**: Users can toggle between viewing the price change as an amount or a percentage.
- **Persisted Watchlist**: The watchlist is saved locally and persists across app restarts.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (or yarn) installed
- Expo CLI installed

### Installation

Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the app, run:
   ```bash
   npm run start
   ```

### Usage
After launching the app, follow these steps:

1. Use the search bar at the top to find stocks.
2. Press the "Add" button next to a stock to add it to your watchlist.
3. View real-time price updates in your watchlist.
4. Press remove button on a stock in your watchlist to remove it.
5. Use the toggle at the top to switch between viewing price changes in dollars or percentage.