# Microtransaction Insights - Tracking and Analysis Platform

### Project Overview

**Microtransaction Insights** is a project designed to help gaming companies efficiently track, analyze, and optimize in-game microtransactions across multiple games. As microtransactions generate significant revenue for game developers and publishers, it's crucial to have a robust system that can identify revenue patterns, track performance metrics, and highlight areas for improvement.
The application provides an intuitive interface for tracking sales data across various games, developers, regions, and time periods. By leveraging real-time transaction data, it enables companies to maximize profits, identify emerging trends, and refine their business strategies.

### Key Features:
- **Multi-game and multi-developer support:** Manage microtransactions from multiple games and developers in one platform.
- **Comprehensive transaction tracking:** Track all transaction details including amounts, dates, customer information, and game-specific data.
- **Sales and performance analysis:** Generate reports to identify peak transaction times, regions with higher revenue, and other key metrics to improve business decision-making.
- **Data management:** Efficiently manage a relational database with complex relationships between games, developers, transactions, and customers.

---

### Technologies Used:
- **Frontend**: (Planned) React.js or Vue.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (planned replacement for MySQL)
- **Containerization**: Docker (planned for deployment to Heroku)
- **Other Tools**: Git, GitHub, Agile methodology

---

### Problem Statement:
Note: this is a concept project.
The game publisher Gotcha Games earns significant in-game microtransaction revenue annually, distributed across multiple games developed by multiple developers. These transactions range in price, and understanding which games, developers, or regions are contributing the most to overall revenue is key to maximizing profits.

The goal of this project is to build a **Microtransaction Database Administration App** that allows Gotcha Games to:
- Track overall sales figures across multiple games and developers.
- Monitor daily, weekly, and monthly transaction patterns.
- Analyze performance based on specific regions and customer behavior.
- Generate reports to assist in strategic decision-making.

### Features:
- **Comprehensive Transaction History**: Each transaction includes essential information such as the transaction amount, date, associated game, and customer details.
- **Developer and Game Insights**: Detailed views on which developers and games contribute most to the revenue, including performance metrics by region and time.
- **Data Analysis and Reporting**: Utilize SQL queries and data analytics to generate reports that help in understanding sales trends and making data-driven business decisions.

---

### Architecture:
The project follows a **Model-View-Controller (MVC)** architecture:
- **Model**: Defines the structure and relationships of database entities (e.g., Games, Developers, Transactions, Customers).
- **View**: The frontend user interface built to display data and interact with the backend.
- **Controller**: The backend logic and API endpoints that handle CRUD operations and business logic.

---

### Future Improvements (Planned):
- **Database**: Migrate from MySQL to **PostgreSQL** for better support of relational data with complex queries.
- **Containerization**: Dockerize the app and PostgreSQL instance for easier deployment and scaling, then deploy to **Heroku**.
- **Frontend**: Implement a modern frontend using **React.js** (or Vue.js) to offer a more dynamic, user-friendly experience.
- **TypeScript Migration**: Migrate the backend from JavaScript to **TypeScript** for better code maintainability, type safety, and scalability.
- **Security**: Enhance security features such as authentication and authorization for accessing transaction data.

---

### Installation Instructions:
To get the project up and running locally, follow these steps:

1. **Clone the repository:**
  ```bash
  git clone https://github.com/samuelberven/microtransaction-insights.git
  cd gotcha-games
  ```
2. Install dependencies and typescript:
  ```bash
  npm install --save-dev typescript ts-node @types/node
  ```
3. Setup PostgreSQL Database:
- Create a PostgreSQL database (e.g., gotcha_games_db) and update the .env file with your database connection details.
4. Generate tsconfig.json:
  ```bash
  npx tsc --init 
  ```

4. Generate tsconfig.json:
  ```bash
  npx tsc --init 
  ```

5. Run tsc compliler
  ```bash
    npx tsc
  ```

5. Run the app
  ```bash
    node dist/index.js
  ```

<!-- 4. Run the application locally:
  ```bash
  npm start
  ``` -->
<!-- 5. Visit the app in your browser: Open http://localhost:3000 to interact with the app. -->

## How to Contribute:
1. Fork the repository
2. Create a feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to your branch (git push origin feature/your-feature)
5. Submit a pull request

## License:
MIT License.
