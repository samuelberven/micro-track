// Get objects to modify
let updateCustomerForm = document.getElementById("update-customer-form-ajax");

// Modify objects
updateCustomerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Get form fields to get data from
  let inputCustomerID = document.getElementById("mySelect");
  let inputServicePlatformID = document.getElementById(
    "input-servicePlatformID-update"
  );
  let inputUsername = document.getElementById("input-username-update");
  let inputEmail = document.getElementById("input-email-update");

  // Get values from form fields
  let customerIDValue = inputCustomerID.value;
  let servicePlatformIDValue = inputServicePlatformID.value;
  let usernameValue = inputUsername.value;
  let emailValue = inputEmail.value;

  // Put data to send in a JS object
  let data = {
    customerID: customerIDValue,
    servicePlatformID: servicePlatformIDValue,
    username: usernameValue,
    email: emailValue,
  };

  // Setup AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      updateRow(xhttp.response, customerIDValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };
  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
  let parsedData = JSON.parse(data);
  let table = document.getElementById("customers-table");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let dataValue = row.getAttribute("data-value");

    if (dataValue === customerID) {
      let attribute = row.getElementsByTagName("td");
      attribute[1].innerHTML = parsedData.customers[0].username;
      attribute[2].innerHTML = parsedData.customers[0].email;
      attribute[3].innerHTML = parsedData.customers[0].servicePlatform;
    }
  }
}
