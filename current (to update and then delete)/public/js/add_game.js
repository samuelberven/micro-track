// Gets object
let addGameForm = document.getElementById("add-game-form-ajax");

// Modifies objects
addGameForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form fields with necessary data
  let inputDeveloperID = document.getElementById("input-developerID");
  let inputTitle = document.getElementById("input-title");
  let inputDescription = document.getElementById("input-description");
  let inputReleaseDate = document.getElementById("input-releaseDate");

  // Get values of said form fields
  let developerIDValue = inputDeveloperID.value;
  let titleValue = inputTitle.value;
  let descriptionValue = inputDescription.value;
  let releaseDateValue = inputReleaseDate.value;

  // Create JS object with pulled data
  let data = {
    developerID: developerIDValue,
    title: titleValue,
    description: descriptionValue,
    releaseDate: releaseDateValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-game-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputDeveloperID.value = "";
      inputTitle.value = "";
      inputDescription.value = "";
      inputReleaseDate.value = "";
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
  let currentTable = document.getElementById("games-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 6 cells
  let row = document.createElement("TR");
  let gameIDCell = document.createElement("TD");
  let developerIDCell = document.createElement("TD");
  let titleCell = document.createElement("TD");
  let descriptionCell = document.createElement("TD");
  let releaseDateCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");

  // Fill cells with correct data
  gameIDCell.innerText = newRow.gameID;
  developerIDCell.innerText = newRow.developerName;
  titleCell.innerText = newRow.title;
  descriptionCell.innerText = newRow.description;
  releaseDateCell.innerText = newRow.releaseDate;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteGame(newRow.gameID);
  };

  // Add cells to row
  row.appendChild(gameIDCell);
  row.appendChild(developerIDCell);
  row.appendChild(titleCell);
  row.appendChild(descriptionCell);
  row.appendChild(releaseDateCell);
  row.appendChild(deleteCell);

  // Add row attribute so deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.gameID);

  // Add the row to the table
  currentTable.appendChild(row);

  // Find drop down menu, create a new option, fill data in the option
  // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.title;
  option.value = newRow.gameID;
  selectMenu.add(option);
};
