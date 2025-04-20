// Gets object
let addMicrotransactionForm = document.getElementById(
  "add-microtransaction-form-ajax"
);

// Modifies objects
addMicrotransactionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form fields with the necessary data
  let inputGameID = document.getElementById("input-gameID");
  let inputPrice = document.getElementById("input-price");
  let inputDescription = document.getElementById("input-description");

  // Get values of said form fields
  let gameIDValue = inputGameID.value;
  let priceValue = inputPrice.value;
  let descriptionValue = inputDescription.value;

  // Create a JS object with pulled data
  let data = {
    gameID: gameIDValue,
    price: priceValue,
    description: descriptionValue,
  };

  // Setup AJAX
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-microtransaction-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputGameID.value = "";
      inputPrice.value = "";
      inputDescription.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));

  // Creates a single row from an Object representing a single record from Developers table
  addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("microtransactions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let microtransactionIDCell = document.createElement("TD");
    let gameIDCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill cells with correct data
    microtransactionIDCell.innerText = newRow.microtransactionID;
    gameIDCell.innerText = newRow.game;
    priceCell.innerText = newRow.price;
    descriptionCell.innerText = newRow.description;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
      deleteMicrotransaction(newRow.microtransactionID);
    };

    // Add cells to row
    row.appendChild(microtransactionIDCell);
    row.appendChild(gameIDCell);
    row.appendChild(priceCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    // Add row attribute so deleteRow function can find a newly added row
    row.setAttribute("data-value", newRow.microtransactionID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.description;
    option.value = newRow.microtransactionID;
    selectMenu.add(option);
  };
});
