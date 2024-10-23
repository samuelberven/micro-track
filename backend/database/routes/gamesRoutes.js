

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