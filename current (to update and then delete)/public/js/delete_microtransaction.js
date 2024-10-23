function deleteMicrotransaction(microtransactionID) {
  // Put data to send in a JS object
  let data = {
    id: microtransactionID,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-microtransaction-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add new data to table
      deleteRow(microtransactionID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };
  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(microtransactionID) {
  let table = document.getElementById("microtransactions-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    if (table.rows[i].getAttribute("data-value") == microtransactionID) {
      table.deleteRow(i);
      deleteDropDownMenu(microtransactionID);
      // break;
    }
  }
}
