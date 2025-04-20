--
-- Add example data to the database
--

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

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
