# Microtransaction Insights - Tracking and Analysis Platform

## Project Overview
**Microtransaction Insights** is a robust platform that enables gaming companies to track, analyze, and optimize in-game microtransactions. By leveraging real-time tracking and deep analytics, decision makers can identify trends, maximize revenue, and fine-tune business strategies across multiple titles.

## Project Evolution

**Original Version:**  
This project began as a Node.js application built with Handlebars templating. It connected directly via SSH to a MySQL database hosted on our school server, serving as a class assignment to illustrate basic server-side development and database interactions.

**Motivation for Improvement:**  
The original implementation, while functional for educational purposes, had several limitations—most notably in scalability, maintainability, and security. Recognizing these constraints, I decided to modernize the project to align with industry best practices.

**Professional Rework:**  
The project was re-engineered using up-to-date technologies and methods:
- **Frontend:** Transitioned to React.js (Vite) to offer a dynamic, responsive interface.
- **Backend:** Redesigned using Node.js, Express.js, and TypeScript, following an MVC architecture.
- **Database:** Implemented a Dockerized MySQL environment for local development, with Azure Database for MySQL – Flexible Server for production deployments.
- **Containerization & Deployment:** Leveraged Docker and Azure Static Web Apps for streamlined deployment and scalability.
<!-- - **Testing:** Introduced comprehensive testing with Jest and realistic data generation via [faker](https://fakerjs.dev/). -->

**Impact:**  
This transformation improved the application's scalability, security, and maintainability. It also allowed me to deepen my expertise in modern development practices, demonstrating my capacity to evolve and enhance existing systems.



## Key Features
- **Multi-Game & Multi-Developer Support:** Manage microtransactions across various titles and teams.
- **Comprehensive Transaction Tracking:** Monitor every detail—from amounts and dates to game-specific data.
<!-- - **Robust Analytics & Reporting:** Generate insights on peak periods, revenue differences, and performance metrics. -->
- **Analytics & Reporting Support:** Generate data helping create insights on peak periods, revenue differences, and performance metrics.
<!-- - **Rigorous Testing:** Implement thorough unit and integration tests using **Jest** and synthetic data via [faker](https://fakerjs.dev/). -->
- **Flexible Data Management:** Use a relational MySQL database (local/Azure) to manage complex data relationships.

## Technologies Used
- **Frontend:** React.js (Vite)
- **Backend:** Node.js, Express.js, TypeScript, Azure Functions
- **Database:** MySQL (Dockerized for local development & Azure Database for MySQL – Flexible Server)
<!-- - **Testing:** Jest & Faker.js -->
- **Containerization & Deployment:** Docker, Azure Static Web Apps

## Architecture
The project adheres to the **Model-View-Controller (MVC)** pattern:
- **Model:** Defines the schema for games, developers, transactions, and customers.
- **View:** A responsive React interface for interactive data visualization.
- **Controller:** API endpoints handling CRUD operations and business logic.
  
> **Note:** The backend uses the adapter pattern to seamlessly switch between local Dockerized MySQL and Azure deployments.

---

## Installation Instructions

### General Setup
1. **Clone the Repository**
  ```bash
    git clone https://github.com/samuelberven/microtransaction-insights.git
    cd microtransaction-insights
  ```
2. **Database Setup (Local Development)**
- Using Dockerized MySQL: The docker-compose.yml file configures MySQL along with initialization scripts.
Ensure Docker is running.
Start the MySQL service with:
  ```bash
    docker-compose up db
  # Update the .env file with your MySQL credentials if necessary.
  ```

3. **Backend Setup**
- Navigate to the backend directory:
  ```bash
    cd backend
    npm install
- Compile and run:
  ```bash
    npx tsc
    node dist/index.js
  ```
- Run tests:
  ```bash
    npm run test
  ```
4. **Frontend Setup**
- Navigate to the frontend directory:
  ```bash
    cd frontend
    npm install
  ```
- Start the development server:
  ```bash
    npm run dev
  ```
  # Open http://localhost:3000 in your browser.
<!-- 5. - Run tests:
  ```bash
    npm run test
  ``` -->

5. **API Testing with Postman**
For easier API exploration and testing, import the provided Postman collection:
Importing the Collection:
- Open Postman and click on Import.
- Navigate to /server/postman/
- Select all 7 postman_collection.json files from that directory
Usage:
- Adjust environment variables as needed (e.g., URL, port).
- Run the requests to validate endpoints and view responses.

**How to Contribute**
- Fork the repository.
- Create a feature branch:
  ```bash
    git checkout -b feature/your-feature
  ```
  Commit your changes:
  ```bash
    git commit -am "Add new feature"
  ```
  Push your branch:
```bash
  git push origin feature/your-feature
Submit a pull request.
License
MIT License.
Roadmap
Q2 2025 Milestones
Complete TypeScript migration and API endpoint standardization.
Implement the adapter pattern for smoother Azure Functions integration.
Dockerize all services for consistent deployment with Azure Static Web Apps and Azure MySQL.
Q3 2025 Milestones
Develop modular serverless backend functions.
Enhance the React interface with Tailwind CSS.
Implement caching for optimized database performance.
Integrate advanced security measures.

# # OLD
# # Microtransaction Insights - Tracking and Analysis Platform

# ## Project Overview
# **Microtransaction Insights** is a robust platform that empowers gaming companies to track, analyze, and optimize in-game microtransactions across multiple titles. Through real-time transaction tracking combined with deep analytics, the platform enables decision makers to identify trends, maximize revenue, and fine-tune business strategies.

# ## Key Features
# - **Multi-Game & Multi-Developer Support:** Manage microtransactions across various titles and development teams within one platform.
# - **Comprehensive Transaction Tracking:** Monitor every detail—from transaction amounts and dates to user-specific and game-specific data.
# <!-- - **Robust Analytics & Reporting:** Generate insightful reports that reveal peak transaction periods, regional revenue differences, and performance metrics. -->
# - **Analytics & Reporting Support:** Generate data that will help reveal peak transaction periods and performance metrics.
# <!-- - **Rigorous Testing:** Comprehensive unit and integration tests are implemented using **Jest** along with synthetic data generation via **Faker.js**, ensuring realistic test scenarios. -->
# - **Flexible Data Management:** Utilize a relational database to effectively manage complex relationships between games, developers, transactions, and customers.

# ## Technologies Used
# - **Frontend:** React.js (Vite)
# - **Backend:** Node.js, Express.js, TypeScript, Azure Functions
# - **Database:** MySQL (for local development) and Azure Database for MySQL – Flexible Server
# <!-- - **Testing:** Jest & Faker.js -->
# - **Containerization & Deployment:** Docker, Azure Static Web Apps

# ## Architecture
# The project follows a **Model-View-Controller (MVC)** structure:

# - **Model:** Defines the database schema for games, developers, transactions, and customers.
# - **View:** A React-based interface that presents data interactively.
# - **Controller:** API endpoints and backend logic that manage CRUD operations and business processes.
  
# > **Note:** To seamlessly switch between the local Dockerized MySQL database and the Azure deployment, the backend leverages the **adapter pattern**. This design abstracts the differences in the underlying database connections, ensuring a smooth transition between development and production environments.

# ## Installation Instructions
# 1. **Clone the Repository**
#    ```bash
#    git clone https://github.com/samuelberven/microtransaction-insights.git
#    cd microtransaction-insights
#   ```

# 2. Install Dependencies
#   ```bash
#     npm install --save-dev typescript ts-node @types/node
#     npm install
#   ```

# Database Setup
# Create a PostgreSQL database (e.g., gotcha_games_db) for your environment.
# Update the .env file with your database connection details.
# Configure TypeScript
# bash
# npx tsc --init
# npx tsc
# Run the Application
# bash
# node dist/index.js
# Testing Run tests with Jest:
# bash
# npm run test
# Tests employ faker to generate synthetic data for realistic test cases.
# How to Contribute
# Fork the repository.
# Create a feature branch:
# bash
# git checkout -b feature/your-feature
# Commit your changes:
# bash
# git commit -am "Add new feature"
# Push your branch:
# bash
# git push origin feature/your-feature
# Submit a pull request.
# License
# This project is licensed under the MIT License.
# Roadmap
# Project Vision: This roadmap outlines the long-term goals and key milestones driving the continuous improvement of Microtransaction Insights, with an emphasis on scalability, performance, and user experience.
# Q2 2025 Milestones
# TypeScript Migration: Complete the transition of backend logic to TypeScript and standardize API endpoints.
# Backend Refactoring: Implement the Adapter Pattern to facilitate modular Azure Functions integration.
# Containerization & Deployment: Dockerize the frontend, backend, and database for deployment using Azure Static Web Apps and Azure MySQL Managed Service.
# Q3 2025 Milestones
# Unified Serverless Backend: Develop modular serverless functions to reduce repetitive code and streamline scalability.
# Enhanced Frontend UI: Roll out an updated React interface enriched with Tailwind CSS for a superior user experience.
# Performance Optimization: Implement caching strategies to reduce database load and enhance response times.
# Security Enhancements: Integrate robust user authentication, authorization, and additional security measures.
# Beyond Q3 2025
# Database Scalability: Consider a migration from MySQL to PostgreSQL for improved handling of complex relational data.
# Advanced Reporting: Develop predictive analytics, add geolocation features, and further enhance data visualizations.
# DevOps Enhancements: Introduce CI/CD pipelines and advanced monitoring tools to streamline development, testing, and deployment processes.








# Frontend Documentation
# Overview: The frontend is built with React.js  (leveraging Vite) and serves as a responsive, interactive interface to visualize transaction data and analytics insights.
# Key Features:
# Real-time data updates and interactive visualizations.
# Responsive design suitable for both mobile and desktop platforms.
# Setup:
# Navigate to the frontend directory:
# bash
# cd frontend
# npm install
# Start the development server:
# bash
# npm run dev
# Open http://localhost:3000 in your browser.
# Testing: Execute frontend tests using:
# bash
# npm run test



# Backend Documentation
# Overview: The backend utilizes Node.js, Express.js, and TypeScript to power a scalable API for managing transactions and business logic. Serverless functions on Azure further enhance scalability and flexibility.
# Key Features:
# RESTful API endpoints for complete transaction management.
# Adheres to an MVC architecture for clean separation of concerns.
# Comprehensive testing using Jest with realistic synthetic data generated by faker.
# Setup:
# Navigate to the backend directory:
# bash
# cd backend
# npm install
# Compile the TypeScript files:
# bash
# npx tsc
# Start the backend server:
# bash
# node dist/index.js
# Testing: Run backend tests:
# bash
# npm run test





# For details on each endpoint and further API documentation, please refer to the dedicated API documentation.





# # ------------------ #



# # Microtransaction Insights - Tracking and Analysis Platform

# ## Project Overview
# **Microtransaction Insights** is a robust platform that empowers gaming companies to track, analyze, and optimize in-game microtransactions across multiple titles. Through real-time transaction tracking combined with deep analytics, the platform enables decision makers to identify trends, maximize revenue, and fine-tune business strategies.

# ## Key Features
# - **Multi-Game & Multi-Developer Support:** Manage microtransactions across various titles and development teams within one platform.
# - **Comprehensive Transaction Tracking:** Monitor every detail—from transaction amounts and dates to user-specific and game-specific data.
# - **Robust Analytics & Reporting:** Generate insightful reports that reveal peak transaction periods, regional revenue differences, and performance metrics.
# - **Rigorous Testing:** Incorporate thorough unit and integration tests using **Jest** along with synthetic data generation via [faker](https://fakerjs.dev/), ensuring realistic test scenarios.
# - **Flexible Data Management:** Utilize a relational database to effectively manage complex relationships between games, developers, transactions, and customers.

# ## Technologies Used
# - **Frontend:** React.js (Vite)
# - **Backend:** Node.js, Express.js, TypeScript, Azure Functions
# - **Database:** MySQL (for local development) and Azure Database for MySQL – Flexible Server
# - **Testing:** Jest & [faker](https://fakerjs.dev/)
# - **Containerization & Deployment:** Docker, Azure Static Web Apps

# ## Architecture
# The project adheres to a **Model-View-Controller (MVC)** structure:
# - **Model:** Defines the database schema for games, developers, transactions, and customers.
# - **View:** A React-based interface that presents data interactively.
# - **Controller:** API endpoints and backend logic that manage CRUD operations and business processes.

# ## Installation Instructions
# 1. **Clone the Repository**
#    ```bash
#    git clone https://github.com/samuelberven/microtransaction-insights.git
#    cd microtransaction-insights





# # Microtransaction Insights - Tracking and Analysis Platform

# ### Project Overview

# **Microtransaction Insights** is a project designed to help gaming companies efficiently track, analyze, and optimize in-game microtransactions across multiple games. As microtransactions generate significant revenue for game developers and publishers, it's crucial to have a robust system that can identify revenue patterns, track performance metrics, and highlight areas for improvement.
# The application provides an intuitive interface for tracking sales data across various games, developers, regions, and time periods. By leveraging real-time transaction data, it enables companies to maximize profits, identify emerging trends, and refine their business strategies.

# ### Key Features:

# - **Multi-game and multi-developer support:** Manage microtransactions from multiple games and developers in one platform.
# - **Comprehensive transaction tracking:** Track all transaction details including amounts, dates, customer information, and game-specific data.
# - **Sales and performance analysis:** Generate reports to identify peak transaction times, regions with higher revenue, and other key metrics to improve business decision-making.
# - **Data management:** Efficiently manage a relational database with complex relationships between games, developers, transactions, and customers.

# ---

# ### Technologies Used:

# - **Frontend**: React.js (Vite)
# - **Backend**: Node.js, Express.js, TypeScript.js, Azure Functions
# - **Database**: MySQL (local development), Azure Database for MySQL - Flexible Server (Burstable Standard_B1ms)
# - **Containerization and Deployment**: Docker, Azure Static Web Apps
# - **Other Tools**: Git, GitHub, Agile methodology

# ---

# ### Problem Statement:
# Note: this is a concept project.
# The game publisher Gotcha Games earns significant in-game microtransaction revenue annually, distributed across multiple games developed by multiple developers. These transactions range in price, and understanding which games, developers, or regions are contributing the most to overall revenue is key to maximizing profits.

# The goal of this project is to build a **Microtransaction Database Administration App** that allows Gotcha Games to:

# - Track overall sales figures across multiple games and developers.
# - Monitor daily, weekly, and monthly transaction patterns.
# - Analyze performance based on specific regions and customer behavior.
# - Generate reports to assist in strategic decision-making.

# ### Features:

# - **Comprehensive Transaction History**: Each transaction includes essential information such as the transaction amount, date, associated game, and customer details.
# - **Developer and Game Insights**: Detailed views on which developers and games contribute most to the revenue, including performance metrics by region and time.
# - **Data Analysis and Reporting**: Utilize SQL queries and data analytics to generate reports that help in understanding sales trends and making data-driven business decisions.

# ---

# ### Architecture:

# The project follows a **Model-View-Controller (MVC)** architecture:

# - **Model**: Defines the structure and relationships of database entities (e.g., Games, Developers, Transactions, Customers).
# - **View**: The frontend user interface built to display data and interact with the backend.
# - **Controller**: The backend logic and API endpoints that handle CRUD operations and business logic.

# ---

# ### Future Improvements (Planned):

# - **Database**: Migrate from MySQL to **PostgreSQL** for better support of relational data with complex queries.
# - **Containerization**: Dockerize the app and PostgreSQL instance for easier deployment and scaling, then deploy to **Heroku**.
# - **Frontend**: Implement a modern frontend using **React.js** (or Vue.js) to offer a more dynamic, user-friendly experience.
# - **TypeScript Migration**: Migrate the backend from JavaScript to **TypeScript** for better code maintainability, type safety, and scalability.
# - **Security**: Enhance security features such as authentication and authorization for accessing transaction data.

# ---

# ### Installation Instructions:

# To get the project up and running locally, follow these steps:

# 1. **Clone the repository:**

# ```bash
# git clone https://github.com/samuelberven/microtransaction-insights.git
# cd gotcha-games
# ```

# 2. Install dependencies and typescript:

# ```bash
# npm install --save-dev typescript ts-node @types/node
# ```

# 3. Setup PostgreSQL Database:

# - Create a PostgreSQL database (e.g., gotcha_games_db) and update the .env file with your database connection details.

# 4. Generate tsconfig.json:

# ```bash
# npx tsc --init
# ```

# 4. Generate tsconfig.json:

# ```bash
# npx tsc --init
# ```

# 5. Run tsc compliler

# ```bash
#   npx tsc
# ```

# 5. Run the app

# ```bash
#   node dist/index.js
# ```

# <!-- 4. Run the application locally:
#   ```bash
#   npm start
#   ``` -->
# <!-- 5. Visit the app in your browser: Open http://localhost:3000 to interact with the app. -->

# ## How to Contribute:

# 1. Fork the repository
# 2. Create a feature branch (git checkout -b feature/your-feature)
# 3. Commit your changes (git commit -am 'Add new feature')
# 4. Push to your branch (git push origin feature/your-feature)
# 5. Submit a pull request

# ## License:

# MIT License.
