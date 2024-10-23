// Gets object
let addCustomerForm = document.getElementById("add-customer-form-ajax");

// Modifies objects
addCustomerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Select form fields with necessary data
  let inputUsername = document.getElementById("input-username");
  let inputEmail = document.getElementById("input-email");
  let inputServicePlatform = document.getElementById("input-servicePlatform");

  // Get values of said form fields
  let usernameValue = inputUsername.value;
  let emailValue = inputEmail.value;
  let servicePlatformValue = inputServicePlatform.value;

  // Create a JS object with pulled data
  let data = {
    username: usernameValue,
    email: emailValue,
    servicePlatformID: servicePlatformValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputUsername.value = "";
      inputEmail.value = "";
      inputServicePlatform.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Customers table
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("customers-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 5 cells
  let row = document.createElement("TR");
  let customerIDCell = document.createElement("TD"); // Todo: This could be the issue
  let usernameCell = document.createElement("TD");
  let emailCell = document.createElement("TD");
  let servicePlatformCell = document.createElement("TD");
  let deleteCell = document.createElement("TD");

  // Fill cells with correct data
  customerIDCell.innerText = newRow.customerID; // Todo: This could be the issue
  usernameCell.innerText = newRow.username;
  emailCell.innerText = newRow.email;
  servicePlatformCell.innerText = newRow.servicePlatform;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteCustomer(newRow.customerID);
  };

  // Add cells to row
  row.appendChild(customerIDCell); // Todo: This could be the issue
  row.appendChild(usernameCell);
  row.appendChild(emailCell);
  row.appendChild(servicePlatformCell);
  row.appendChild(deleteCell);

  // Add row attribute so deleteRow function can find a newly added row
  row.setAttribute("data-value", newRow.customerID);

  // Add the row to the table
  currentTable.appendChild(row);

  // Todo: Look more into why exactly this works
  // Find drop down menu, create a new option, fill data in the option
  // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
  let selectMenu = document.getElementById("mySelect");
  let option = document.createElement("option");
  option.text = newRow.username;
  option.value = newRow.customerID;
  selectMenu.add(option);
};
