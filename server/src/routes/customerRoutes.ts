console.log("Not implemented yet");

// /***************************************
//               Customers ROUTES
//   ***************************************/

//   // Customers READ route
//   app.get("/customers", function (req, res) {
//     // Declare Query 1
//     let query1 = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
//       FROM Customers
//       JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
//       ORDER BY customerID ASC;`;

//     // Declare Query 2
//     let query2 = "SELECT * FROM ServicePlatforms;";

//     db.pool.query(query1, function (error, rows, fields) {
//       // Execute the query

//       let customers = rows;

//       // Run the second query
//       db.pool.query(query2, (error, rows, fields) => {
//         // Save the planets
//         let servicePlatforms = rows;
//         return res.render("customers", {
//           data: customers,
//           servicePlatforms: servicePlatforms,
//         });
//       });
//     });
//   });

//   // Customers CREATE route
//   app.post("/add-customer-ajax", function (req, res) {
//     // Capture the incoming data and parse it back to a JS object
//     let data = req.body;

//     // todo: Figure out when and how to capture NULL values properly
//     // Capture NULL values
//     let servicePlatformID = parseInt(data.servicePlatformID);
//     if (isNaN(servicePlatformID)) {
//       servicePlatformID = "NULL";
//     }

//     // Create the query and run it on the database
//     query1 = `INSERT INTO Customers (username, email, servicePlatformID) VALUES (
//               "${data.username}", "${data.email}", "${data.servicePlatformID}")`;

//     db.pool.query(query1, function (error, rows, fields) {
//       // Check to see if there was an error
//       if (error) {
//         // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//         console.log(error);
//         res.sendStatus(400);
//       } else {
//         // If there was no error, perform a SELECT * on Developers
//         query2 = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
//                   FROM Customers
//                   JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
//                   ORDER BY customerID ASC;`;
//         db.pool.query(query2, function (error, rows, fields) {
//           // If there was an error on the second query, send a 400
//           if (error) {
//             // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//             console.log(error);
//             res.sendStatus(400);
//           }
//           // If all went well, send the results of the query back.
//           else {
//             res.send(rows);
//           }
//         });
//       }
//     });
//   });

//   // Customers DELETE route
//   app.delete("/delete-customer-ajax/", function (req, res, next) {
//     let data = req.body;
//     let customerID = parseInt(data.id);
//     let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
//     let deleteCustomersHaveGame = `DELETE FROM CustomersHaveGames WHERE customerID = ?`;

//     // Run the query (Query 1)
//     db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//         res.sendStatus(400);
//       }
//       {
//         // Run the second query
//         db.pool.query(
//           deleteCustomersHaveGame,
//           [customerID],
//           function (error, rows, fields) {
//             if (error) {
//               console.log(error);
//               res.sendStatus(400);
//             } else {
//               res.sendStatus(204);
//             }
//           }
//         );
//       }
//     });
//   });

//   // Customers UPDATE route
//   app.put("/put-customer-ajax", function (req, res, next) {
//     // Get response
//     let data = req.body;

//     // Developers table attributes
//     let customerID = parseInt(data.customerID);
//     let servicePlatformID = parseInt(data.servicePlatformID);
//     let username = data.username;
//     let email = data.email;

//     // TODO: Find a way to update multiple columns with a single query here, if possible
//     let query1 = `UPDATE Customers SET servicePlatformID = ?, username = ?, email = ? WHERE Customers.customerID = ?`;
//     let customersQuery = `SELECT Customers.customerID, Customers.username, Customers.email, ServicePlatforms.platformName AS servicePlatform
//       FROM Customers
//       JOIN ServicePlatforms ON Customers.servicePlatformID = ServicePlatforms.servicePlatformID
//       WHERE Customers.customerID = ${customerID}`;

//     // Run the queries 1 through 3
//     db.pool.query(
//       query1,
//       [servicePlatformID, username, email, customerID],
//       function (error, rows, fields) {
//         if (error) {
//           //If there is an error, log the error
//           console.log(error);
//           return res.sendStatus(400);
//         } else {
//           db.pool.query(
//             customersQuery,
//             [customerID],
//             function (error, rows, fields) {
//               res.send({ customers: rows });
//             }
//           );
//         }
//       }
//     );
//   });
