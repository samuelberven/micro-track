--
-- SELECT queries
--

-- show Games table
SELECT Games.gameID, Developers.developerName, Games.title, Games.description, DATE_FORMAT(Games.releaseDate, "%Y-%m-%d") AS releaseDate
FROM Games
JOIN Developers ON Games.developerID = Developers.developerID
ORDER BY gameID ASC;

-- show Customers table
SELECT Customers.customerID, Customers.username, ServicePlatforms.platformName AS servicePlatform, Customers.email
FROM Customers
JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
ORDER BY customerID ASC;

-- show ServicePlatforms table
SELECT * FROM ServicePlatforms
ORDER BY servicePlatformID ASC;

-- show Purchases table
SELECT Purchases.purchaseID, Customers.username, Microtransactions.description AS microtransaction, DATE_FORMAT(Purchases.date, "%Y-%m-%d") AS date
FROM Purchases
JOIN Customers ON Purchases.customerID = Customers.customerID
JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
ORDER BY purchaseID ASC;

-- show Microtransactions table
SELECT Microtransactions.microtransactionID, Games.title AS game, Microtransactions.price, Microtransactions.description
FROM Microtransactions
JOIN Games ON Microtransactions.gameID = Games.gameID
ORDER BY microtransactionID ASC;

-- show Developers table
SELECT * FROM Developers
ORDER BY developerID ASC;

-- show CustomersHaveGames table
SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
FROM CustomersHaveGames
JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
JOIN Games ON CustomersHaveGames.gameID = Games.gameID
ORDER BY customersHaveGamesID ASC;

--** Possible plans for a statistics page **--

-- show Customers information for all Purchases including Microtransactions description
SELECT Customers.customerID, Customers.username, Customers.email, Purchases.purchaseID, Purchases.date, Microtransactions.description AS microtransaction
FROM Customers
INNER JOIN Purchases ON Customers.customerID = Purchases.customerID
INNER JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
ORDER BY Customers.username ASC;

-- show Developers and the Game titles they've made
SELECT Developers.developerName, Games.title
FROM Developers
INNER JOIN Games ON Developers.developerID = Games.developerID
ORDER BY Developers.developerName ASC, Games.title ASC;

-- show total sales for each Service Platform
SELECT ServicePlatforms.platformName, SUM(Microtransactions.price) AS totalSales
FROM ServicePlatforms
JOIN Customers ON ServicePlatforms.servicePlatformID = Customers.servicePlatformID
JOIN Purchases ON Customers.customerID = Purchases.customerID
JOIN Microtransactions ON Microtransactions.microtransactionID = Purchases.microtransactionID
GROUP BY ServicePlatforms.platformName
ORDER BY ServicePlatforms.platformName ASC;

-- show total sales for each Customer
SELECT Customers.username, SUM(Microtransactions.price) AS totalSales
FROM Customers
JOIN Purchases ON Customers.customerID = Purchases.customerID
JOIN Microtransactions ON Microtransactions.microtransactionID = Purchases.microtransactionID
GROUP BY Customers.username
ORDER BY Customers.username ASC;

-- show all Purchases for 'Puddle Splasher 2K'
SELECT Purchases.purchaseID, Purchases.microtransactionID, Microtransactions.description, Purchases.date
FROM Purchases
JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
AND Microtransactions.gameID = 1
ORDER BY purchaseID ASC;


--
-- INSERT queries
--

-- insert into ServicePlatforms
INSERT INTO ServicePlatforms (
    platformName
)
VALUES
(:platformNameInput);

-- insert into Developers
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
    :developerNameInput,
    :addressInput,
    :cityInput,
    :stateInput,
    :zipCodeInput,
    :emailInput,
    :contactInput
);

-- insert into Games
INSERT INTO Games (
    developerID,
    title,
    description,
    releaseDate
)
VALUES
(
    :developerIDInput,
    :titleInput,
    :descriptionInput,
    :releaseDateInput
);

-- insert into Customers
INSERT INTO Customers (
    username,
    servicePlatformID,
    email
)
VALUES
(
    :usernameInput,
    :servicePlatformIDInput,
    :emailInput
);

-- insert into CustomersHaveGames
INSERT INTO CustomersHaveGames (
    customerID,
    gameID
)
VALUES
(
    :customerIDInput,
    :gameIDInput
);

-- insert into Microtransactions
INSERT INTO Microtransactions (
    gameID,
    price,
    description
)
VALUES
(
    :gameIDInput,
    :priceInput,
    :descriptionInput
);

-- insert into Purchases
INSERT INTO Purchases (
    customerID,
    microtransactionID,
    date
)
VALUES
(
    :customerIDInput,
    :microtransactionIDInput,
    :dateInput
);

--
-- UPDATE queries
--

-- update Developers data
UPDATE Developers
SET developerName = :developerNameInput, address = :addressInput, city = :cityInput, state = :stateInput, zipCode = :zipCodeInput, email = :emailInput, contact = :contactInput
WHERE developerID = :developerIDInput

-- update Purchases
UPDATE Purchases
SET customerID = :customerIDInput, microtransactionID = :microtransactionIDInput, date = :dateInput
WHERE purchaseID = :purchaseIDInput

--
-- DELETE queries
--

-- delete Purchase data
DELETE FROM Purchases WHERE purchaseID = :purchaseIDInput;

-- delete CustomersHaveGames data
DELETE FROM CustomersHaveGames WHERE customerID = :customerIDInput;