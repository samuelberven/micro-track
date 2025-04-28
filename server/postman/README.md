# Postman Collections for Gotcha Games API

This directory contains Postman collections for testing the Gotcha Games API endpoints. The collections cover the following tables:
1. **ServicePlatforms**
2. **Developers**
3. **Games**
4. **Customers**
5. **CustomersHaveGames**
6. **Microtransactions**
7. **Purchases**

## Requirements

- **Postman**:  
  Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)  
  Postman is a standalone application available for Windows, macOS, and Linux.

## Setup

1. **BASE_URL**: All requests use the base URL:  
   `http://localhost:3000`  
   Make sure your API server is running at this address and port.

2. **Importing Collections**:
   - Open Postman.
   - Click on **Collections** in the left sidebar.
   - Click the **Import** button.
   - Choose the JSON file for the desired collection (e.g., `Customers.postman_collection.json`, `CustomersHaveGames.postman_collection.json`, etc.).
   - The collection will appear in your Postman sidebar.

3. **Testing Endpoints**:
   - Select a collection and open an individual request.
   - Review and modify the request if needed (headers, body, etc.).
   - Click **Send** to test the endpoint.
   - Verify the response.

## Running Automated Tests

- **Newman**:  
  You can use Newman (Postman's CLI tool) to run your collections from the terminal for CI/CD integrations.  
  Install Newman via npm:
  ```bash
  npm install -g newman
