# API Test Collections

This directory contains Thunder Client test collections for the Gotcha Games API.

## Collections
- `serviceplatforms.json`: Tests for service platforms (Steam, Epic, etc.)
- `developers.json`: Tests for game developers
- `games.json`: Tests for games
- `customers.json`: Tests for customer accounts
- `customershavegames.json`: Tests for game ownership
- `microtransactions.json`: Tests for in-game purchases
- `purchases.json`: Tests for transaction records

## Usage
1. Install Thunder Client extension in VS Code
2. Import each .json file as a separate collection
3. Run tests individually or as collections
4. Ensure server is running on localhost:3000

## Test Order
Some tests depend on data created by others. Recommended test order:
1. Service Platforms
2. Developers
3. Games
4. Customers
5. CustomersHaveGames
6. Microtransactions
7. Purchases
