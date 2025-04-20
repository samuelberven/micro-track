--
-- Create tables for entities in database
--

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Service Platforms category table
CREATE TABLE IF NOT EXISTS ServicePlatforms (
    servicePlatformID INT NOT NULL AUTO_INCREMENT,
    platformName VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (servicePlatformID)
);

-- Developers table
CREATE TABLE IF NOT EXISTS Developers (
    developerID INT NOT NULL AUTO_INCREMENT,
    developerName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zipCode INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    PRIMARY KEY (developerID)
);

-- Games table
CREATE TABLE IF NOT EXISTS Games (
    gameID INT NOT NULL AUTO_INCREMENT,
    developerID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    releaseDate DATE NOT NULL,
    PRIMARY KEY (gameID),
    FOREIGN KEY (developerID) REFERENCES Developers(developerID)
    ON DELETE CASCADE
);

-- Customers table
CREATE TABLE IF NOT EXISTS Customers (
    customerID INT NOT NULL AUTO_INCREMENT,
    servicePlatformID INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,    
    PRIMARY KEY (customerID),
    FOREIGN KEY (servicePlatformID) REFERENCES ServicePlatforms(servicePlatformID)
    ON DELETE CASCADE
);

-- CustomersHaveGames table
CREATE TABLE IF NOT EXISTS CustomersHaveGames (
    customersHaveGamesID INT NOT NULL AUTO_INCREMENT,
    customerID INT NOT NULL,
    gameID INT NOT NULL,
    installDate DATE,
    PRIMARY KEY (customersHaveGamesID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
    ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE
);

-- Microtransactions table 
CREATE TABLE IF NOT EXISTS Microtransactions (
    microtransactionID INT NOT NULL AUTO_INCREMENT,
    gameID INT NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (microtransactionID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE
);

-- Purchases table
CREATE TABLE IF NOT EXISTS Purchases (
    purchaseID INT NOT NULL AUTO_INCREMENT,
    customerID INT NULL,  -- Must allow NULL for ON DELETE SET NULL to work
    microtransactionID INT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (purchaseID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
    ON DELETE SET NULL,
    FOREIGN KEY (microtransactionID) REFERENCES Microtransactions(microtransactionID)
    ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
