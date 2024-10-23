// Express
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 21952;

// Imports express-handlebars and creates an instance of the handlebars engine to process templates
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
// Uses handlebars engine whenever a *.hbs file is encountered.
app.set("view engine", ".hbs");

// Database
var db = require("./database/database-connector");

/*
    ROUTES
*/
// app.js Routes

// Index.hbs > Home page
app.get("/", function (req, res) {
  // Render the index.hbs file, and also send the renderer
  return res.render("index");
});

/***************************************
        ROUTES ORDER 
            - Games
            - Microtransactions
            - Purchases
            - Customers
            - ServicePlatforms
            - CustomersHaveGames
            - Developers
***************************************/

/***************************************
            Games ROUTES
***************************************/

// Games READ route
app.get("/games", function (req, res) {
  // Declare Query 1
  let query1 = `SELECT Games.gameID, Developers.developerName, Games.title, Games.description, DATE_FORMAT(Games.releaseDate, "%Y-%m-%d") AS releaseDate
    FROM Games
    JOIN Developers ON Games.developerID = Developers.developerID
    ORDER BY gameID ASC;`;

  // Declare Query 2
  let query2 = "SELECT * FROM Developers;";

  // Run Query 1the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the games
    let games = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the planets
      let developers = rows;
      return res.render("games", { data: games, developers: developers });
    });
  });
});

// Games CREATE route
app.post("/add-game-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Games (developerID, title, description, releaseDate) VALUES (
            "${data.developerID}", "${data.title}", "${data.description}", "${data.releaseDate}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Games
      query2 = `SELECT Games.gameID, Developers.developerName, Games.title, Games.description, DATE_FORMAT(Games.releaseDate, "%Y-%m-%d") AS releaseDate
                FROM Games
                JOIN Developers ON Games.developerID = Developers.developerID
                ORDER BY gameID ASC;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Games DELETE route
app.delete("/delete-game-ajax/", function (req, res, next) {
  let data = req.body;
  let gameID = parseInt(data.id);
  let deleteCustomersHaveGame = `DELETE FROM CustomersHaveGames WHERE gameID = ?`;
  let deleteGame = `DELETE FROM Games WHERE gameID = ?`;

  // Run the 1st query
  db.pool.query(
    deleteCustomersHaveGame,
    [gameID],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        // Run the second query
        db.pool.query(deleteGame, [gameID], function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        });
      }
    }
  );
});

// Games UPDATE route
app.put("/put-game-ajax", function (req, res, next) {
  let data = req.body;
  let gameID = parseInt(data.gameID);
  let developerID = parseInt(data.developerID);
  let title = data.title;
  let description = data.description;
  let releaseDate = data.releaseDate;

  let query1 = `UPDATE Games SET developerID = ?, title = ?, description = ?, releaseDate = ? WHERE Games.gameID = ?`;
  let query2 = `SELECT Games.gameID, Developers.developerName, Games.title, Games.description, DATE_FORMAT(Games.releaseDate, "%Y-%m-%d") AS releaseDate
    FROM Games
    JOIN Developers ON Games.developerID = Developers.developerID
    WHERE gameID = ${gameID};`;

  db.pool.query(
    query1,
    [developerID, title, description, releaseDate, gameID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        return res.sendStatus(400);
      } else {
        db.pool.query(query2, [gameID], function (error, rows, fields) {
          res.send({ games: rows });
        });
      }
    }
  );
});

/***************************************
        Microtransactions ROUTES
***************************************/

// Microtransactions READ route
app.get("/microtransactions", function (req, res) {
  let query1 = `SELECT Microtransactions.microtransactionID, Games.title AS game, Microtransactions.price, Microtransactions.description
    FROM Microtransactions
    JOIN Games ON Microtransactions.gameID = Games.gameID
    ORDER BY microtransactionID ASC;`;
  let query2 = "SELECT * FROM Games;";

  db.pool.query(query1, function (error, rows, fields) {
    let microtransactions = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let games = rows;
      return res.render("microtransactions", {
        data: microtransactions,
        games: games,
      });
    });
  });
});

// Microtransactions CREATE route
app.post("/add-microtransaction-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Microtransactions (gameID, price, description) VALUES (
            "${data.gameID}", "${data.price}", "${data.description}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Games
      query2 = `SELECT Microtransactions.microtransactionID, Games.title AS game, Microtransactions.price, Microtransactions.description
                FROM Microtransactions
                JOIN Games ON Microtransactions.gameID = Games.gameID
                ORDER BY microtransactionID ASC;`;

      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Microtransactions DELETE route
app.delete("/delete-microtransaction-ajax/", function (req, res, next) {
  let data = req.body;
  let microtransactionID = parseInt(data.id);
  let deleteMicrotransaction = `DELETE FROM Microtransactions WHERE microtransactionID = ?`;

  // Run the query (Query 1)
  db.pool.query(
    deleteMicrotransaction,
    [microtransactionID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

/***************************************
            Purchases ROUTES
***************************************/

// Purchases READ route
app.get("/purchases", function (req, res) {
  let query1 = `SELECT Purchases.purchaseID, Customers.username, Microtransactions.description AS microtransaction, DATE_FORMAT(Purchases.date, "%Y-%m-%d") AS date
  FROM Purchases
  LEFT JOIN Customers ON Purchases.customerID = Customers.customerID
  JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
  ORDER BY purchaseID ASC;`;
  let query2 = "SELECT * FROM Customers;";
  let query3 = "SELECT * FROM Microtransactions;";

  // Run Query 1the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the purchases
    let purchases = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the customers
      let customers = rows;

      // Run the third query
      db.pool.query(query3, (error, rows, fields) => {
        // Save the microtransactions
        let microtransactions = rows;
        return res.render("purchases", {
          data: purchases,
          customers: customers,
          microtransactions: microtransactions,
        });
      });
    });
  });
});

// Purchases CREATE route
app.post("/add-purchase-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Purchases (customerID, microtransactionID, date) VALUES (
            "${data.customerID}", "${data.microtransactionID}", "${data.date}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Developers
      query2 = `SELECT Purchases.purchaseID, Customers.username, Microtransactions.description AS microtransaction, DATE_FORMAT(Purchases.date, "%Y-%m-%d") AS date
                FROM Purchases
                JOIN Customers ON Purchases.customerID = Customers.customerID
                JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
                ORDER BY purchaseID ASC;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Purchases DELETE route
app.delete("/delete-purchase-ajax/", function (req, res, next) {
  let data = req.body;
  let purchaseID = parseInt(data.id);
  let deletePurchase = `DELETE FROM Purchases WHERE purchaseID = ?`;

  // Run the query (Query 1)
  db.pool.query(deletePurchase, [purchaseID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put("/put-purchase-ajax", function (req, res, next) {
  // Get response
  let data = req.body;

  // Developers table attributes
  let purchaseID = parseInt(data.purchaseID);
  let customerID = parseInt(data.customerID);
  if (isNaN(customerID)) {
    customerID = "NULL";
  }
  let microtransactionID = parseInt(data.microtransactionID);
  let date = data.date;

  let query1 = `UPDATE Purchases SET customerID = ?, microtransactionID = ?, date = ? WHERE Purchases.purchaseID = ?`;
  let query2 = `UPDATE Purchases SET customerID = NULL, microtransactionID = ?, date = ? WHERE Purchases.purchaseID = ?`;
  let purchasesQuery = `SELECT Purchases.purchaseID, Customers.username, Microtransactions.description AS microtransaction, DATE_FORMAT(Purchases.date, "%Y-%m-%d") AS date
    FROM Purchases
    LEFT JOIN Customers ON Purchases.customerID = Customers.customerID
    JOIN Microtransactions ON Purchases.microtransactionID = Microtransactions.microtransactionID
    WHERE Purchases.purchaseID = ${purchaseID}`;

  // Run the queries 1 through 3
  if (customerID === "NULL") {
    db.pool.query(
      query2,
      [microtransactionID, date, purchaseID],
      function (error, rows, fields) {
        if (error) {
          //If there is an error, log the error
          console.log(error);
          return res.sendStatus(400);
        } else {
          db.pool.query(
            purchasesQuery,
            [purchaseID],
            function (error, rows, fields) {
              res.send({ purchases: rows });
            }
          );
        }
      }
    );
  } else {
    db.pool.query(
      query1,
      [customerID, microtransactionID, date, purchaseID],
      function (error, rows, fields) {
        if (error) {
          //If there is an error, log the error
          console.log(error);
          return res.sendStatus(400);
        } else {
          db.pool.query(
            purchasesQuery,
            [purchaseID],
            function (error, rows, fields) {
              res.send({ purchases: rows });
            }
          );
        }
      }
    );
  }
});

/***************************************
            Customers ROUTES
***************************************/

// Customers READ route
app.get("/customers", function (req, res) {
  // Declare Query 1
  let query1 = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
    FROM Customers
    JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
    ORDER BY customerID ASC;`;

  // Declare Query 2
  let query2 = "SELECT * FROM ServicePlatforms;";

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let customers = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the planets
      let servicePlatforms = rows;
      return res.render("customers", {
        data: customers,
        servicePlatforms: servicePlatforms,
      });
    });
  });
});

// Customers CREATE route
app.post("/add-customer-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // todo: Figure out when and how to capture NULL values properly
  // Capture NULL values
  let servicePlatformID = parseInt(data.servicePlatformID);
  if (isNaN(servicePlatformID)) {
    servicePlatformID = "NULL";
  }

  // Create the query and run it on the database
  query1 = `INSERT INTO Customers (username, email, servicePlatformID) VALUES (
            "${data.username}", "${data.email}", "${data.servicePlatformID}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Developers
      query2 = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
                FROM Customers
                JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
                ORDER BY customerID ASC;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Customers DELETE route
app.delete("/delete-customer-ajax/", function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
  let deleteCustomersHaveGame = `DELETE FROM CustomersHaveGames WHERE customerID = ?`;

  // Run the query (Query 1)
  db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    {
      // Run the second query
      db.pool.query(
        deleteCustomersHaveGame,
        [customerID],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

// Customers UPDATE route
app.put("/put-customer-ajax", function (req, res, next) {
  // Get response
  let data = req.body;

  // Developers table attributes
  let customerID = parseInt(data.customerID);
  let servicePlatformID = parseInt(data.servicePlatformID);
  let username = data.username;
  let email = data.email;

  // TODO: Find a way to update multiple columns with a single query here, if possible
  let query1 = `UPDATE Customers SET servicePlatformID = ?, username = ?, email = ? WHERE Customers.customerID = ?`;
  let customersQuery = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
    FROM Customers
    JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
    WHERE Customers.customerID = ${customerID}`;

  // Run the queries 1 through 3
  db.pool.query(
    query1,
    [servicePlatformID, username, email, customerID],
    function (error, rows, fields) {
      if (error) {
        //If there is an error, log the error
        console.log(error);
        return res.sendStatus(400);
      } else {
        db.pool.query(
          customersQuery,
          [customerID],
          function (error, rows, fields) {
            res.send({ customers: rows });
          }
        );
      }
    }
  );
});

/***************************************
        ServicePlatforms ROUTES
***************************************/

// ServicePlatforms READ route
app.get("/service-platforms", function (req, res) {
  let query1 = "SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;"; // Define our query
  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render("service-platforms", { data: rows }); // Render the index.hbs file, and also send the renderer
  });
});

// ServicePlatforms CREATE route
app.post("/add-service-platform-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // todo: Figure out when and how to capture NULL values properly
  // Capture NULL values
  // let zipCode = parseInt(data.zipCode);
  // if (isNaN(zipCode))
  // {
  //     zipCode = 'NULL'
  // }

  // Create the query and run it on the database
  query1 = `INSERT INTO ServicePlatforms (platformName) VALUES (
            "${data.platformName}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on ServicePlatforms
      query2 = `SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// ServicePlatforms DELETE route
app.delete("/delete-service-platform-ajax/", function (req, res, next) {
  let data = req.body;
  let servicePlatformID = parseInt(data.id);
  let deleteServicePlatform = `DELETE FROM ServicePlatforms WHERE servicePlatformID = ?`;

  // Run the query (Query 1)
  db.pool.query(
    deleteServicePlatform,
    [servicePlatformID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

/***************************************
        CustomersHaveGames ROUTES
***************************************/

// CustomersHaveGames READ route
app.get("/customers-have-games", function (req, res) {
  // {
  //     return res.render('customers-have-games'); // Render the index.hbs file, and also send the renderer
  // });
  let query1 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
    FROM CustomersHaveGames
    JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
    JOIN Games ON CustomersHaveGames.gameID = Games.gameID
    ORDER BY customersHaveGamesID ASC;`;
  let query2 = "SELECT * FROM Customers;";
  let query3 = "SELECT * FROM Games;";

  // Run Query 1the 1st query
  db.pool.query(query1, function (error, rows, fields) {
    // Save the customersHaveGames entries
    let customersHaveGames = rows;

    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
      // Save the customers
      let customers = rows;

      // Run the third query
      db.pool.query(query3, (error, rows, fields) => {
        // Save the games
        let games = rows;
        return res.render("customers-have-games", {
          data: customersHaveGames,
          customers: customers,
          games: games,
        });
      });
    });
  });
});

// CustomersHaveGames CREATE route
app.post("/add-customers-have-games-ajax", function (req, res) {
  // // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // // Create the query and run it on the database
  query1 = `INSERT INTO CustomersHaveGames (customerID, gameID, installDate) VALUES (
            "${data.customerID}", "${data.gameID}", "${data.installDate}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on ServicePlatforms
      query2 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
                    FROM CustomersHaveGames
                    JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
                    JOIN Games ON CustomersHaveGames.gameID = Games.gameID
                    ORDER BY customersHaveGamesID ASC;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Customers_Have_Games UPDATE route
app.put("/put-customers-have-games-ajax", function (req, res, next) {
  // Get response
  let data = req.body;

  // Developers table attributes
  let customersHaveGamesID = parseInt(data.customersHaveGamesID);
  let customerID = parseInt(data.customerID);
  let gameID = parseInt(data.gameID);
  let installDate = data.installDate;

  let query1 = `UPDATE CustomersHaveGames SET customerID = ?, gameID = ?, installDate = ? WHERE CustomersHaveGames.customersHaveGamesID = ?`;
  let query2 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
    FROM CustomersHaveGames
    JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
    JOIN Games ON CustomersHaveGames.gameID = Games.gameID
    WHERE customersHaveGamesID = ${customersHaveGamesID};`;

  // Run the queries 1 through 2
  db.pool.query(
    query1,
    [customerID, gameID, installDate, customersHaveGamesID],
    function (error, rows, fields) {
      if (error) {
        //If there is an error, log the error
        console.log(error);
        return res.sendStatus(400);
      } else {
        db.pool.query(
          query2,
          [customersHaveGamesID],
          function (error, rows, fields) {
            res.send({ customersHaveGames: rows });
          }
        );
      }
    }
  );
});

// Customers_Have_Games DELETE route
app.delete("/delete-customers-have-games-ajax/", function (req, res, next) {
  let data = req.body;
  let customersHaveGamesID = parseInt(data.id);
  let deleteCustomersHaveGame = `DELETE FROM CustomersHaveGames WHERE customersHaveGamesID = ?`;

  // Run the 1st query
  db.pool.query(
    deleteCustomersHaveGame,
    [customersHaveGamesID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

/***************************************
            Developers ROUTES
***************************************/

// Developers READ route
app.get("/developers", function (req, res) {
  let query1 = "SELECT * FROM Developers;"; // Define our query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render("developers", { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // an object where 'data' is equal to the 'rows'
});

// Developers CREATE route
app.post("/add-developer-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Developers (developerName, address, city, state, zipCode, email, contact) VALUES (
            "${data.developerName}", "${data.address}", "${data.city}", "${data.state}", ${data.zipCode}, "${data.email}", "${data.contact}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Developers
      query2 = `SELECT * FROM Developers;`;
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

// Developers DELETE route
app.delete("/delete-developer-ajax/", function (req, res, next) {
  let data = req.body;
  let developerID = parseInt(data.id);
  let deleteDeveloper = `DELETE FROM Developers WHERE developerID = ?`;

  // Run the query (Query 1)
  db.pool.query(deleteDeveloper, [developerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// Developers UPDATE route
app.put("/put-developer-ajax", function (req, res, next) {
  // Get response
  let data = req.body;

  // Developers table attributes
  let developerID = parseInt(data.developerID);
  let developerName = data.developerName;
  let address = data.address;
  let city = data.city;
  let state = data.state;
  let zipCode = parseInt(data.zipCode);
  let email = data.email;
  let contact = data.contact;

  let query1 = `UPDATE Developers SET developerName = ?, address = ?, city = ?, state = ?, zipCode = ?, email = ?, contact = ? WHERE Developers.developerID = ?`;

  // Run the query 1
  db.pool.query(
    query1,
    [developerName, address, city, state, zipCode, email, contact, developerID],
    function (error, rows, fields) {}
  );

  updatedData = {
    developerName: developerName,
    address: address,
    city: city,
    state: state,
    zipCode: zipCode,
    email: email,
    contact: contact,
  };

  res.send(updatedData);
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
