import express from 'express';
import { getServicePlatforms, createServicePlatform, deleteServicePlatform, } from '../controllers/servicePlatformController.js';
const router = express.Router();
// READ
router.get('/service-platforms', getServicePlatforms);
// CREATE
router.post('/add-service-platform-ajax', createServicePlatform);
// DELETE
router.delete('/delete-service-platform-ajax', deleteServicePlatform);
export default router;
// /***************************************
//         ServicePlatforms ROUTES
// ***************************************/
// // ServicePlatforms READ route
// app.get("/service-platforms", function (req, res) {
//   let query1 = "SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;"; // Define our query
//   db.pool.query(query1, function (error, rows, fields) {
//     // Execute the query
//     res.render("service-platforms", { data: rows }); // Render the index.hbs file, and also send the renderer
//   });
// });
// // ServicePlatforms CREATE route
// app.post("/add-service-platform-ajax", function (req, res) {
//   // Capture the incoming data and parse it back to a JS object
//   let data = req.body;
//   // todo: Figure out when and how to capture NULL values properly
//   // Capture NULL values
//   // let zipCode = parseInt(data.zipCode);
//   // if (isNaN(zipCode))
//   // {
//   //     zipCode = 'NULL'
//   // }
//   // Create the query and run it on the database
//   query1 = `INSERT INTO ServicePlatforms (platformName) VALUES (
//             "${data.platformName}")`;
//   db.pool.query(query1, function (error, rows, fields) {
//     // Check to see if there was an error
//     if (error) {
//       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       // If there was no error, perform a SELECT * on ServicePlatforms
//       query2 = `SELECT * FROM ServicePlatforms ORDER BY servicePlatformID ASC;`;
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
// // ServicePlatforms DELETE route
// app.delete("/delete-service-platform-ajax/", function (req, res, next) {
//   let data = req.body;
//   let servicePlatformID = parseInt(data.id);
//   let deleteServicePlatform = `DELETE FROM ServicePlatforms WHERE servicePlatformID = ?`;
//   // Run the query (Query 1)
//   db.pool.query(
//     deleteServicePlatform,
//     [servicePlatformID],
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
