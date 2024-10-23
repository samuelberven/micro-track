function deleteDeveloper(developerID) {
  // Put data to send in a JS object
  let data = {
    id: developerID,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-developer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add new data to table
      deleteRow(developerID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };
  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(developerID) {
  let table = document.getElementById("developers-table");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    if (table.rows[i].getAttribute("data-value") == developerID) {
      table.deleteRow(i);
      deleteDropDownMenu(developerID);
      break;
    }
  }
}

function deleteDropDownMenu(developerID) {
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(developerID)) {
      selectMenu[i].remove();
      break;
    }
  }
}
