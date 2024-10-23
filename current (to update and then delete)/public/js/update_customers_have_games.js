// Get the objects to modify
let updateCustomersHaveGamesForm = document.getElementById(
  "update-customers-have-games-form-ajax"
);

// Modify objects
updateCustomersHaveGamesForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form fields to get data from
  let inputCustomersHaveGamesID = document.getElementById("mySelect");
  let inputCustomerID = document.getElementById("input-customerID-update");
  let inputGameID = document.getElementById("input-gameID-update");
  let inputInstallDate = document.getElementById("input-installDate-update");

  // Get values from form fields
  let customersHaveGamesIDValue = inputCustomersHaveGamesID.value;
  let customerIDValue = inputCustomerID.value;
  let gameIDValue = inputGameID.value;
  let installDateValue = inputInstallDate.value;

  // Create JS object with data to send
  let data = {
    customersHaveGamesID: customersHaveGamesIDValue,
    customerID: customerIDValue,
    gameID: gameIDValue,
    installDate: installDateValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-customers-have-games-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      updateRow(xhttp.response, customersHaveGamesIDValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, customersHaveGamesIDValue) {
  let parsedData = JSON.parse(data);
  let table = document.getElementById("customers-have-games-table");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let dataValue = row.getAttribute("data-value");

    if (dataValue === customersHaveGamesIDValue) {
      let attribute = row.getElementsByTagName("td");
      attribute[1].innerHTML = parsedData.customersHaveGames[0].username;
      attribute[2].innerHTML = parsedData.customersHaveGames[0].game;
      attribute[3].innerHTML = parsedData.customersHaveGames[0].installDate;
    }
  }
}
