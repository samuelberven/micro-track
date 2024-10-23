// Gets object
let addDeveloperForm = document.getElementById("add-developer-form-ajax");

// Modifies objects
addDeveloperForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form fields with the necessary data
  let inputDeveloperName = document.getElementById("input-developerName");
  let inputAddress = document.getElementById("input-address");
  let inputCity = document.getElementById("input-city");
  let inputState = document.getElementById("input-state");
  let inputZipCode = document.getElementById("input-zipCode");
  let inputEmail = document.getElementById("input-email");
  let inputContact = document.getElementById("input-contact");

  // Get values of said form fields
  let developerNameValue = inputDeveloperName.value;
  let addressValue = inputAddress.value;
  let cityValue = inputCity.value;
  let stateValue = inputState.value;
  let zipCodeValue = inputZipCode.value;
  let emailValue = inputEmail.value;
  let contactValue = inputContact.value;

  // Create a JS object with pulled data
  let data = {
    developerName: developerNameValue,
    address: addressValue,
    city: cityValue,
    state: stateValue,
    zipCode: zipCodeValue,
    email: emailValue,
    contact: contactValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-developer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputDeveloperName.value = "";
      inputAddress.value = "";
      inputCity.value = "";
      inputState.value = "";
      inputZipCode.value = "";
      inputEmail.value = "";
      inputContact.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Developers table
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("developers-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 9 cells
  let row = document.createElement("TR");
  let developerIDCell = document.createElement("TD");
  let developerNameCell = document.createElement("TD");
  let addressCell = document.createElement("TD");
  let cityCell = document.createElement("TD");
  let stateCell = document.createElement("TD");
  let zipCodeCell = document.createElement("TD");
  let emailCell = document.createElement("TD");
  let contactCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");

  // Fill cells with correct data
  developerIDCell.innerText = newRow.developerID;
  developerNameCell.innerText = newRow.developerName;
  addressCell.innerText = newRow.address;
  cityCell.innerText = newRow.city;
  stateCell.innerText = newRow.state;
  zipCodeCell.innerText = newRow.zipCode;
  emailCell.innerText = newRow.email;
  contactCell.innerText = newRow.contact;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteDeveloper(newRow.developerID);
  };

  // Add cells to row
  row.appendChild(developerIDCell);
  row.appendChild(developerNameCell);
  row.appendChild(addressCell);
  row.appendChild(cityCell);
  row.appendChild(stateCell);
  row.appendChild(zipCodeCell);
  row.appendChild(emailCell);
  row.appendChild(contactCell);
  row.appendChild(deleteCell);

  // Add row attribute so deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.developerID);

  // Add the row to the table
  currentTable.appendChild(row);

  // Find drop down menu, create a new option, fill data in the option
  // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.developerName;
  option.value = newRow.developerID;
  selectMenu.add(option);
};
