-- CS340 Spring 2023 Portfolio Project final delivery - Group 72, Project: Gotcha Games

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

--
-- Create tables for entities in database
--

-- Service Platforms category table
CREATE OR REPLACE TABLE ServicePlatforms (
    servicePlatformID int NOT NULL unique AUTO_INCREMENT,
    platformName varchar(45) NOT NULL unique,
    PRIMARY KEY (servicePlatformID)
);

-- Developers table
CREATE OR REPLACE TABLE Developers (
    developerID int NOT NULL unique AUTO_INCREMENT,
    developerName varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    city varchar(45) NOT NULL,
    state varchar(2) NOT NULL,
    zipCode int NOT NULL,
    email varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    PRIMARY KEY (developerID)
);

-- Games table
CREATE OR REPLACE TABLE Games (
    gameID int NOT NULL unique AUTO_INCREMENT,
    developerID int NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    releaseDate date NOT NULL,
    PRIMARY KEY (gameID),
    FOREIGN KEY (developerID) REFERENCES Developers(developerID)
    ON DELETE CASCADE
);

-- Customers table
CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL unique AUTO_INCREMENT,
    servicePlatformID int NOT NULL,
    username varchar(255) NOT NULL unique,
    email varchar(255) NOT NULL unique,    
    PRIMARY KEY (customerID),
    FOREIGN KEY (servicePlatformID) REFERENCES ServicePlatforms(servicePlatformID)
    ON DELETE CASCADE
);

-- CustomersHaveGames table
CREATE OR REPLACE TABLE CustomersHaveGames (
    customersHaveGamesID int NOT NULL unique AUTO_INCREMENT,
    customerID int NOT NULL,
    gameID int NOT NULL,
    installDate date,
    PRIMARY KEY (customersHaveGamesID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
    ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE
);

-- Microtransactions table 
CREATE OR REPLACE TABLE Microtransactions (
    microtransactionID int NOT NULL unique AUTO_INCREMENT,
    gameID int NOT NULL,
    price decimal(19,2) NOT NULL,
    description varchar(255) NOT NULL,
    PRIMARY KEY (microtransactionID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE
);

-- Purchases table
CREATE OR REPLACE TABLE Purchases (
    purchaseID int NOT NULL unique AUTO_INCREMENT,
    customerID int,
    microtransactionID int NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (purchaseID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
    ON DELETE SET NULL,
    FOREIGN KEY (microtransactionID) REFERENCES Microtransactions(microtransactionID)
    ON DELETE CASCADE
);

--
-- Add example data to the database
--

-- ServicePlatforms data
INSERT INTO ServicePlatforms (
    platformName
)
VALUES
('Apple'),
('Google');

-- Developers data
INSERT INTO Developers (
    developerName,
    address,
    city,
    state,
    zipCode,
    email,
    contact
)
VALUES
(
    'Seintendo',
    '1234 Example Ave.',
    'Mario',
    'CA',
    34410,
    'questions@seintendo.com',
    'Daniel Danielson'
),(
    'Seinga',
    '45678 Nonexistent Drive',
    'Sonic',
    'GA',
    50912,
    'requests@seinga.com',
    'Anders Anderson'
),(
    'UbiSein',
    '1458 France Way',
    'Rayman',
    'MN',
    64349,
    'conundrums@ubisein.com',
    'Robert Robertson'
),(
    'MicroSein',
    '400 Broad Street',
    'Doomguy',
    'TX',
    60036,
    'queries@microsein.com',
    'John Johnson'
);

-- Games data
INSERT INTO Games (
    developerID,
    title,
    description,
    releaseDate
)
VALUES
(
    (SELECT developerID FROM Developers WHERE developerName = 'Seintendo'),
    'Puddle Splasher 2K',
    'Realistic puddle splash simulator',
    20190712
),(
    (SELECT developerID FROM Developers WHERE developerName = 'Seinga'),
    'Rocks and Branches',
    'Battle royale title in an outdoor setting',
    20200114
),(
    (SELECT developerID FROM Developers WHERE developerName = 'UbiSein'),
    'The Hokey Pokey',
    'Stirring and shocking visual novel',
    20210202
),(
    (SELECT developerID FROM Developers WHERE developerName = 'MicroSein'),
    'Who Let The Dogs Out',
    'Atmospheric and interactive detective tale',
    20211129
);

-- Customers data
INSERT INTO Customers (
    username,
    servicePlatformID,
    email
)
VALUES
(
    'john2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = "Apple"),
    'johnnytwokay@gmail.com'
),(
    'jacobs2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = "Apple"),
    'jakejake@hotmail.com'
),(
    'jingleheimer2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = "Google"),
    'jingles@gmail.com'
),(
    'schmidt2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = "Google"),
    'schmiddybear1990@yahoo.com'
);

-- CustomersHaveGames data
INSERT INTO CustomersHaveGames (
    customerID,
    gameID,
    installDate
)
VALUES
(1,1,20190712),
(1,2,20200114),
(2,2,20200114),
(3,2,20200114),
(1,3,20210202),
(3,3,20210202),
(4,4,20211129),
(1,4,20211129);

-- Microtransactions data
INSERT INTO Microtransactions (
    gameID,
    price,
    description
)
VALUES
(
    1,
    0.99,
    '100 diamonds'
),(
    1,
    9.99,
    '1500 diamonds'
),(
    1,
    99.99,
    '20000 diamonds'
),(
    2,
    2.99,
    'hero skin - gold knight'
),(
    2,
    2.99,
    'hero skin - skull mage'
),(
    2,
    2.99,
    'hero skin - spec OPS'
),(
    3,
    9.99,
    'no ads'
),(
    4,
    4.99,
    '777 diamonds'
),(
    4,
    47.99,
    '7777 diamonds'
);

-- Purchases data
INSERT INTO Purchases (
    customerID,
    microtransactionID,
    date
)
VALUES
(
    (SELECT customerID FROM Customers WHERE username = "john2k"),
    2,
    20190811
),(
    (SELECT customerID FROM Customers WHERE username = "john2k"),
    3,
    20191030
),(
    (SELECT customerID FROM Customers WHERE username = "john2k"),
    3,
    20191030
),(
    (SELECT customerID FROM Customers WHERE username = "jacobs2k"),
    5,
    20200301
),(
    (SELECT customerID FROM Customers WHERE username = "jingleheimer2k"),
    6,
    20200412
),(
    (SELECT customerID FROM Customers WHERE username = "schmidt2k"),
    7,
    20210205
),(
    (SELECT customerID FROM Customers WHERE username = "john2k"),
    9,
    20211206
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;