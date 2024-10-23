// Gets object
let addCustomersHaveGamesForm = document.getElementById(
  "add-customers-have-games-form-ajax"
);

// Modifies objects
addCustomersHaveGamesForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form fields with the necessary data
  let inputCustomerID = document.getElementById("input-customerID");
  let inputGameID = document.getElementById("input-gameID");
  let inputInstallDate = document.getElementById("input-installDate");

  // Get values of said form fields
  let customerIDValue = inputCustomerID.value;
  let gameIDValue = inputGameID.value;
  let installDateValue = inputInstallDate.value;

  // Create a JS object with pulled data
  let data = {
    customerID: customerIDValue,
    gameID: gameIDValue,
    installDate: installDateValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-customers-have-games-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputCustomerID.value = "";
      inputGameID.value = "";
      inputInstallDate.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Games table
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("customers-have-games-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 5 cells
  let row = document.createElement("TR");
  let customersHaveGamesIDCell = document.createElement("TD");
  let customerIDCell = document.createElement("TD");
  let gameIDCell = document.createElement("TD");
  let installDateCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");

  // Fill cells with correct data
  customersHaveGamesIDCell.innerText = newRow.customersHaveGamesID;
  customerIDCell.innerText = newRow.username;
  gameIDCell.innerText = newRow.game;
  installDateCell.innerText = newRow.installDate;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteCustomersHaveGame(newRow.customersHaveGamesID);
  };

  // Add cells to row
  row.appendChild(customersHaveGamesIDCell);
  row.appendChild(customerIDCell);
  row.appendChild(gameIDCell);
  row.appendChild(installDateCell);
  row.appendChild(deleteCell);

  // Add row attribute so deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.customersHaveGamesID);

  // Add the row to the table
  currentTable.appendChild(row);

  // Find drop down menu, create a new option, fill data in the option
  // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.customersHaveGamesID;
  option.value = newRow.customersHaveGamesID;
  selectMenu.add(option);
};
