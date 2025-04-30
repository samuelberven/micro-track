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
  ```
  # Submit a pull request.

# License
MIT License.