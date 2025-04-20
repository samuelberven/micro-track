--
-- Add example data to the database
--

-- service_platforms data
INSERT INTO service_platforms (
    platform_name
)
VALUES
('Apple'),
('Google');

-- developers data
INSERT INTO developers (
    developer_name,
    street_address,
    city,
    state,
    zip_code,
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

-- games data
INSERT INTO games (
    developer_id,
    title,
    description,
    release_date
)
VALUES
(
    (SELECT id FROM developers WHERE developer_name = 'Seintendo'),
    'Puddle Splasher 2K',
    'Realistic puddle splash simulator',
    '2019-07-12'
), (
    (SELECT id FROM developers WHERE developer_name = 'Seinga'),
    'Rocks and Branches',
    'Battle royale title in an outdoor setting',
    '2020-01-14'
), (
    (SELECT id FROM developers WHERE developer_name = 'UbiSein'),
    'The Hokey Pokey',
    'Stirring and shocking visual novel',
    '2021-02-02'
), (
    (SELECT id FROM developers WHERE developer_name = 'MicroSein'),
    'Who Let The Dogs Out',
    'Atmospheric and interactive detective tale',
    '2021-11-29'
);

-- customers data
INSERT INTO customers (
    username,
    service_platform_id,
    email
)
VALUES
(
    'john2k',
    (SELECT id FROM service_platforms WHERE platform_name = 'Apple'),
    'johnnytwokay@gmail.com'
),(
    'jacobs2k',
    (SELECT id FROM service_platforms WHERE platform_name = 'Apple'),
    'jakejake@hotmail.com'
),(
    'jingleheimer2k',
    (SELECT id FROM service_platforms WHERE platform_name = 'Google'),
    'jingles@gmail.com'
),(
    'schmidt2k',
    (SELECT id FROM service_platforms WHERE platform_name = 'Google'),
    'schmiddybear1990@yahoo.com'
);

-- customers_have_games data
INSERT INTO customers_have_games (
    customer_id,
    game_id,
    install_date
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

-- microtransactions data
INSERT INTO microtransactions (
    game_id,
    microtransaction_name,
    price,
    description
)
VALUES
(
    1,
    '100 diamonds',
    0.99,
    '100 diamonds'
),(
    1,
    '1500 diamonds',
    9.99,
    '1500 diamonds'
),(
    1,
    '20000 diamonds',
    99.99,
    '20000 diamonds'
),(
    2,
    'hero skin - gold knight',
    2.99,
    'hero skin - gold knight'
),(
    2,
    'hero skin - skull mage',
    2.99,
    'hero skin - skull mage'
),(
    2,
    'hero skin - spec OPS',
    2.99,
    'hero skin - spec OPS'
),(
    3,
    'no ads',
    9.99,
    'no ads'
),(
    4,
    '777 diamonds',
    4.99,
    '777 diamonds'
),(
    4,
    '7777 diamonds',
    47.99,
    '7777 diamonds'
);

-- purchases data
INSERT INTO purchases (
    customer_id,
    microtransaction_id,
    date
)
VALUES
(
    (SELECT id FROM customers WHERE username = 'john2k'),
    2,
    '2019-08-11'
),(
    (SELECT id FROM customers WHERE username = 'john2k'),
    3,
    '2019-10-30'
),(
    (SELECT id FROM customers WHERE username = 'john2k'),
    3,
    '2019-10-30'
),(
    (SELECT id FROM customers WHERE username = 'jacobs2k'),
    5,
    '2020-03-01'
),(
    (SELECT id FROM customers WHERE username = 'jingleheimer2k'),
    6,
    '2020-04-12'
),(
    (SELECT id FROM customers WHERE username = 'schmidt2k'),
    7,
    '2021-02-05'
),(
    (SELECT id FROM customers WHERE username = 'john2k'),
    9,
    '2021-12-06'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
