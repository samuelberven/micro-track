function deleteCustomersHaveGame(customersHaveGamesID) {
    // Put data to send in a JS object
    let data = {
        id: customersHaveGamesID
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customers-have-games-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add new data to table
            deleteRow(customersHaveGamesID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(customersHaveGamesID){
    let table = document.getElementById("customers-have-games-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == customersHaveGamesID) {
            table.deleteRow(i);
            break;
       }
    }
}
