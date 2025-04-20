--
-- Create tables for entities in database
--

-- service platforms category table
CREATE TABLE IF NOT EXISTS service_platforms (
    id bigint primary key generated always as identity,
    platform_name varchar(45) UNIQUE NOT NULL
);

-- developers table
CREATE TABLE IF NOT EXISTS developers (
    id bigint primary key generated always as identity,
    developer_name varchar(50) UNIQUE NOT NULL,
    street_address varchar(255) NOT NULL,
    city varchar(45) NOT NULL,
    state varchar(2) NOT NULL,
    zip_code int NOT NULL,
    email varchar(255) NOT NULL,
    contact varchar(255) NOT NULL
);

-- games table
CREATE TABLE IF NOT EXISTS games (
    id bigint primary key generated always as identity,
    developer_id int NOT NULL,
    title varchar(100) NOT NULL,
    description varchar(255) NOT NULL,
    release_date date NOT NULL,
    FOREIGN KEY (developer_id) REFERENCES developers(id)
    ON DELETE CASCADE
);

-- customers table
CREATE TABLE IF NOT EXISTS customers (
    id bigint primary key generated always as identity,
    service_platform_id int NOT NULL,
    username varchar(255) NOT NULL unique,
    email varchar(255) NOT NULL unique,    
    FOREIGN KEY (service_platform_id) REFERENCES service_platforms(id)
    ON DELETE CASCADE
);

-- customers_have_games table
CREATE TABLE IF NOT EXISTS customers_have_games (
    id bigint primary key generated always as identity,
    customer_id bigint,
    game_id bigint,
    install_date date,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id)
    ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS microtransactions (
    id bigint primary key generated always as identity,
    microtransaction_name varchar(255) NOT NULL unique,
    game_id bigint NOT NULL,
    price decimal(19,2) NOT NULL,
    description varchar(255) NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id)
    ON DELETE CASCADE
);

-- purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id bigint primary key generated always as identity,
    customer_id int,
    microtransaction_id int NOT NULL,
    date date NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE SET NULL,
    FOREIGN KEY (microtransaction_id) REFERENCES microtransactions(id)
    ON DELETE CASCADE
);
