  /***************************************
              Developers ROUTES
  ***************************************/
  
 // Developers READ route
app.get("/api/developers", async (req, res) => {
  const { data, error } = await supabase
      .from("developers")
      .select("*");

  if (error) {
    return res.status(400).send("Error fetching developers");
  }

  // Render the developers view with the retrieved data
  res.render("developers", { data });
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