function deletePurchase(purchaseID) {
  // Put data to send in a JS object
  let data = {
    id: purchaseID,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-purchase-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add new data to table
      deleteRow(purchaseID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };
  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(purchaseID) {
  let table = document.getElementById("purchases-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    if (table.rows[i].getAttribute("data-value") == purchaseID) {
      table.deleteRow(i);
      break;
    }
  }
}
