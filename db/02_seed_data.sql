-- Seed example data to the Gotcha Games app's gotcha_games database

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Select the correct database
USE gotcha_games;

-- Service Platforms Data
INSERT INTO ServicePlatforms (platformName)
VALUES ('Apple'), ('Google');

-- Developers Data
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
), (
    'Seinga',
    '45678 Nonexistent Drive',
    'Sonic',
    'GA',
    50912,
    'requests@seinga.com',
    'Anders Anderson'
), (
    'UbiSein',
    '1458 France Way',
    'Rayman',
    'MN',
    64349,
    'conundrums@ubisein.com',
    'Robert Robertson'
), (
    'MicroSein',
    '400 Broad Street',
    'Doomguy',
    'TX',
    60036,
    'queries@microsein.com',
    'John Johnson'
);

-- Games Data
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
    '2019-07-12'
), (
    (SELECT developerID FROM Developers WHERE developerName = 'Seinga'),
    'Rocks and Branches',
    'Battle royale title in an outdoor setting',
    '2020-01-14'
), (
    (SELECT developerID FROM Developers WHERE developerName = 'UbiSein'),
    'The Hokey Pokey',
    'Stirring and shocking visual novel',
    '2021-02-02'
), (
    (SELECT developerID FROM Developers WHERE developerName = 'MicroSein'),
    'Who Let The Dogs Out',
    'Atmospheric and interactive detective tale',
    '2021-11-29'
);

-- Customers Data
INSERT INTO Customers (
    username,
    servicePlatformID,
    email
)
VALUES
(
    'john2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = 'Apple'),
    'johnnytwokay@gmail.com'
), (
    'jacobs2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = 'Apple'),
    'jakejake@hotmail.com'
), (
    'jingleheimer2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = 'Google'),
    'jingles@gmail.com'
), (
    'schmidt2k',
    (SELECT servicePlatformID FROM ServicePlatforms WHERE platformName = 'Google'),
    'schmiddybear1990@yahoo.com'
);

-- CustomersHaveGames Data
INSERT INTO CustomersHaveGames (
    customerID,
    gameID,
    installDate
)
VALUES
(1, 1, '2019-07-12'),
(1, 2, '2020-01-14'),
(2, 2, '2020-01-14'),
(3, 2, '2020-01-14'),
(1, 3, '2021-02-02'),
(3, 3, '2021-02-02'),
(4, 4, '2021-11-29'),
(1, 4, '2021-11-29');

-- Microtransactions Data
INSERT INTO Microtransactions (
    gameID,
    price,
    description
)
VALUES
(1, 0.99, '100 diamonds'),
(1, 9.99, '1500 diamonds'),
(1, 99.99, '20000 diamonds'),
(2, 2.99, 'Hero skin - Gold Knight'),
(2, 2.99, 'Hero skin - Skull Mage'),
(2, 2.99, 'Hero skin - Spec OPS'),
(3, 9.99, 'No ads'),
(4, 4.99, '777 diamonds'),
(4, 47.99, '7777 diamonds');

-- Purchases Data
INSERT INTO Purchases (
    customerID,
    microtransactionID,
    date
)
VALUES
(
    (SELECT customerID FROM Customers WHERE username = 'john2k'),
    2,
    '2019-08-11'
), (
    (SELECT customerID FROM Customers WHERE username = 'john2k'),
    3,
    '2019-10-30'
), (
    (SELECT customerID FROM Customers WHERE username = 'john2k'),
    3,
    '2019-10-30'
), (
    (SELECT customerID FROM Customers WHERE username = 'jacobs2k'),
    5,
    '2020-03-01'
), (
    (SELECT customerID FROM Customers WHERE username = 'jingleheimer2k'),
    6,
    '2020-04-12'
), (
    (SELECT customerID FROM Customers WHERE username = 'schmidt2k'),
    7,
    '2021-02-05'
), (
    (SELECT customerID FROM Customers WHERE username = 'john2k'),
    9,
    '2021-12-06'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
