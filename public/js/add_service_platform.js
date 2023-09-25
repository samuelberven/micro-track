// Gets object
let addServicePlatformForm = document.getElementById('add-service-platform-form-ajax');

// Modifies objects
addServicePlatformForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    // Select form fields with the necessary data 
    let inputPlatformName = document.getElementById("input-platformName");

    // Get values of said form fields
    let platformNameValue = inputPlatformName.value;

    // Create a JS object with pulled data
    let data = {
        platformName: platformNameValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-service-platform-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPlatformName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request and wait for response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Service Platforms table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("service-platforms-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 9 cells
    let row = document.createElement("TR");
    let servicePlatformIDCell = document.createElement("TD");
    let platformNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill cells with correct data
    servicePlatformIDCell.innerText = newRow.servicePlatformID;
    platformNameCell.innerText = newRow.platformName;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteServicePlatform(newRow.servicePlatformID);
    };

    // Add cells to row 
    row.appendChild(servicePlatformIDCell);
    row.appendChild(platformNameCell);
    row.appendChild(deleteCell);



    // Add row attribute so deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.servicePlatformID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.platformName;
    option.value = newRow.servicePlatformID;
    selectMenu.add(option);
}
