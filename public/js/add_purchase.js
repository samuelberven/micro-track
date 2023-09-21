/*
    Citation for the following code:
    Date: 2023/05/24
    Adapted from:
    https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Gets object
let addPurchaseForm = document.getElementById('add-purchase-form-ajax');

// Modifies objects
addPurchaseForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    // Select form fields with the necessary data 
    let inputCustomerID = document.getElementById("input-customerID");
    let inputMicrotransactionID = document.getElementById("input-microtransactionID");
    let inputDate = document.getElementById("input-date");

    // Get values of said form fields
    let customerIDValue = inputCustomerID.value;
    let microtransactionIDValue = inputMicrotransactionID.value;
    let dateValue = inputDate.value;

    // Create a JS object with pulled data
    let data = {
        customerID: customerIDValue,
        microtransactionID: microtransactionIDValue,
        date: dateValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-purchase-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputMicrotransactionID.value = '';
            inputDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Purchases table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("purchases-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let purchaseIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let microtransactionIDCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill cells with correct data
    purchaseIDCell.innerText = newRow.purchaseID;
    customerIDCell.innerText = newRow.username;
    microtransactionIDCell.innerText = newRow.microtransaction;
    dateCell.innerText = newRow.date;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePurchase(newRow.purchaseID);
    };

    // Add cells to row 
    row.appendChild(purchaseIDCell);
    row.appendChild(customerIDCell);
    row.appendChild(microtransactionIDCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);

    // Add row attribute so deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.purchaseID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.microtransactionID;
    option.value = newRow.purchaseID;
    selectMenu.add(option);
}