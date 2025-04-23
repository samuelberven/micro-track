"use strict";
console.log("Not implemented yet");
// /***************************************
//         CustomersHaveGames ROUTES
// ***************************************/
// // CustomersHaveGames READ route
// app.get("/customers-have-games", function (req, res) {
//   // {
//   //     return res.render('customers-have-games'); // Render the index.hbs file, and also send the renderer
//   // });
//   let query1 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
//     FROM CustomersHaveGames
//     JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
//     JOIN Games ON CustomersHaveGames.gameID = Games.gameID
//     ORDER BY customersHaveGamesID ASC;`;
//   let query2 = "SELECT * FROM Customers;";
//   let query3 = "SELECT * FROM Games;";
//   // Run Query 1the 1st query
//   db.pool.query(query1, function (error, rows, fields) {
//     // Save the customersHaveGames entries
//     let customersHaveGames = rows;
//     // Run the second query
//     db.pool.query(query2, (error, rows, fields) => {
//       // Save the customers
//       let customers = rows;
//       // Run the third query
//       db.pool.query(query3, (error, rows, fields) => {
//         // Save the games
//         let games = rows;
//         return res.render("customers-have-games", {
//           data: customersHaveGames,
//           customers: customers,
//           games: games,
//         });
//       });
//     });
//   });
// });
// // CustomersHaveGames CREATE route
// app.post("/add-customers-have-games-ajax", function (req, res) {
//   // // Capture the incoming data and parse it back to a JS object
//   let data = req.body;
//   // // Create the query and run it on the database
//   query1 = `INSERT INTO CustomersHaveGames (customerID, gameID, installDate) VALUES (
//             "${data.customerID}", "${data.gameID}", "${data.installDate}")`;
//   db.pool.query(query1, function (error, rows, fields) {
//     // Check to see if there was an error
//     if (error) {
//       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       // If there was no error, perform a SELECT * on ServicePlatforms
//       query2 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
//                     FROM CustomersHaveGames
//                     JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
//                     JOIN Games ON CustomersHaveGames.gameID = Games.gameID
//                     ORDER BY customersHaveGamesID ASC;`;
//       db.pool.query(query2, function (error, rows, fields) {
//         // If there was an error on the second query, send a 400
//         if (error) {
//           // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//           console.log(error);
//           res.sendStatus(400);
//         }
//         // If all went well, send the results of the query back.
//         else {
//           res.send(rows);
//         }
//       });
//     }
//   });
// });
// // Customers_Have_Games UPDATE route
// app.put("/put-customers-have-games-ajax", function (req, res, next) {
//   // Get response
//   let data = req.body;
//   // Developers table attributes
//   let customersHaveGamesID = parseInt(data.customersHaveGamesID);
//   let customerID = parseInt(data.customerID);
//   let gameID = parseInt(data.gameID);
//   let installDate = data.installDate;
//   let query1 = `UPDATE CustomersHaveGames SET customerID = ?, gameID = ?, installDate = ? WHERE CustomersHaveGames.customersHaveGamesID = ?`;
//   let query2 = `SELECT CustomersHaveGames.customersHaveGamesID, Customers.username, Games.title AS game, DATE_FORMAT(CustomersHaveGames.installDate, "%Y-%m-%d") AS installDate
//     FROM CustomersHaveGames
//     JOIN Customers ON CustomersHaveGames.customerID = Customers.customerID
//     JOIN Games ON CustomersHaveGames.gameID = Games.gameID
//     WHERE customersHaveGamesID = ${customersHaveGamesID};`;
//   // Run the queries 1 through 2
//   db.pool.query(
//     query1,
//     [customerID, gameID, installDate, customersHaveGamesID],
//     function (error, rows, fields) {
//       if (error) {
//         //If there is an error, log the error
//         console.log(error);
//         return res.sendStatus(400);
//       } else {
//         db.pool.query(
//           query2,
//           [customersHaveGamesID],
//           function (error, rows, fields) {
//             res.send({ customersHaveGames: rows });
//           }
//         );
//       }
//     }
//   );
// });
// // Customers_Have_Games DELETE route
// app.delete("/delete-customers-have-games-ajax/", function (req, res, next) {
//   let data = req.body;
//   let customersHaveGamesID = parseInt(data.id);
//   let deleteCustomersHaveGame = `DELETE FROM CustomersHaveGames WHERE customersHaveGamesID = ?`;
//   // Run the 1st query
//   db.pool.query(
//     deleteCustomersHaveGame,
//     [customersHaveGamesID],
//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//         res.sendStatus(400);
//       } else {
//         res.sendStatus(204);
//       }
//     }
//   );
// });
