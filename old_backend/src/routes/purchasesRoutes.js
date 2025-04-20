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
  
