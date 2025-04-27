import { Request, Response } from "express";
import { BaseMySQLAdapter } from "../adapters/DatabaseAdapters.js";
import { ServicePlatform } from "../types/ServicePlatform.js";
import { InsertResult } from "../types/InsertResult.js";

// GET all ServicePlatforms route
export function getAllServicePlatforms(dbAdapter: BaseMySQLAdapter) {
  return async (_req: Request, res: Response) => {
    try {
      const rows = await dbAdapter.query<ServicePlatform>(
        "SELECT * FROM ServicePlatforms",
      );
      res.json(rows);
    } catch (error) {
      console.error("Error fetching ServicePlatforms data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// GET ServicePlatform by ID route
export function getServicePlatformById(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [row] = await dbAdapter.query<ServicePlatform>(
        "SELECT * FROM ServicePlatforms WHERE servicePlatformID = ?",
        [id],
      );
      if (row) {
        res.json(row);
      } else {
        res
          .status(404)
          .json({ error: "That particular ServicePlatform not found" });
      }
    } catch (error) {
      console.error("Error fetching ServicePlatform by ID, error", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };
}

// POST (create) ServicePlatform route
export function createServicePlatform(dbAdapter: BaseMySQLAdapter) {
  return async (req: Request, res: Response) => {
    try {
      const { platformName } = req.body;

      // Use `command` for INSERT operations with our custom InsertResult type
      const result = await dbAdapter.command<InsertResult>(
        "INSERT INTO ServicePlatforms (platformName) VALUES (?)",
        [platformName],
      );

      res.status(201).json({
        message: "ServicePlatform created",
        id: result.insertId,
      });
    } catch (error: any) {
      // Use any (or unknown) to inspect the error details
      console.error("Error creating ServicePlatform:", error.message || error);
      res.status(500).json({ error: "Failed to create data" });
    }
  };
}

// PATCH (update) ServicePlatform (by ID) route

// DELETE ServicePlatform (by ID) route

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
