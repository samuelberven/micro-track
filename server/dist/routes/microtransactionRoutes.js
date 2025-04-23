"use strict";
console.log("Not implemented yet");
// /***************************************
//         Microtransactions ROUTES
// ***************************************/
// // Microtransactions READ route
// app.get("/microtransactions", function (req, res) {
//   let query1 = `SELECT Microtransactions.microtransactionID, Games.title AS game, Microtransactions.price, Microtransactions.description
//     FROM Microtransactions
//     JOIN Games ON Microtransactions.gameID = Games.gameID
//     ORDER BY microtransactionID ASC;`;
//   let query2 = "SELECT * FROM Games;";
//   db.pool.query(query1, function (error, rows, fields) {
//     let microtransactions = rows;
//     db.pool.query(query2, (error, rows, fields) => {
//       let games = rows;
//       return res.render("microtransactions", {
//         data: microtransactions,
//         games: games,
//       });
//     });
//   });
// });
// // Microtransactions CREATE route
// app.post("/add-microtransaction-ajax", function (req, res) {
//   // Capture the incoming data and parse it back to a JS object
//   let data = req.body;
//   // Create the query and run it on the database
//   query1 = `INSERT INTO Microtransactions (gameID, price, description) VALUES (
//             "${data.gameID}", "${data.price}", "${data.description}")`;
//   db.pool.query(query1, function (error, rows, fields) {
//     // Check to see if there was an error
//     if (error) {
//       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       // If there was no error, perform a SELECT * on Games
//       query2 = `SELECT Microtransactions.microtransactionID, Games.title AS game, Microtransactions.price, Microtransactions.description
//                 FROM Microtransactions
//                 JOIN Games ON Microtransactions.gameID = Games.gameID
//                 ORDER BY microtransactionID ASC;`;
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
// // Microtransactions DELETE route
// app.delete("/delete-microtransaction-ajax/", function (req, res, next) {
//   let data = req.body;
//   let microtransactionID = parseInt(data.id);
//   let deleteMicrotransaction = `DELETE FROM Microtransactions WHERE microtransactionID = ?`;
//   // Run the query (Query 1)
//   db.pool.query(
//     deleteMicrotransaction,
//     [microtransactionID],
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
