// Get the objects we need to modify
let updateDeveloperForm = document.getElementById("update-developer-form-ajax");

// Modify the objects we need
updateDeveloperForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form fields to get data from
  let inputDeveloperID = document.getElementById("mySelect");
  let inputDeveloperName = document.getElementById(
    "input-developerName-update"
  );
  let inputAddress = document.getElementById("input-address-update");
  let inputCity = document.getElementById("input-city-update");
  let inputState = document.getElementById("input-state-update");
  let inputZipCode = document.getElementById("input-zipCode-update");
  let inputEmail = document.getElementById("input-email-update");
  let inputContact = document.getElementById("input-contact-update");

  // Get values from form fields
  let developerIDValue = inputDeveloperID.value;
  let developerNameValue = inputDeveloperName.value;
  let addressValue = inputAddress.value;
  let cityValue = inputCity.value;
  let stateValue = inputState.value;
  let zipCodeValue = inputZipCode.value;
  let emailValue = inputEmail.value;
  let contactValue = inputContact.value;

  // Create JS object with data to send
  let data = {
    developerID: developerIDValue,
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
  xhttp.open("PUT", "/put-developer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add new data to table
      updateRow(xhttp.response, developerIDValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send request and wait for response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, developerID) {
  let parsedData = JSON.parse(data);
  let table = document.getElementById("developers-table");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let dataValue = row.getAttribute("data-value");

    if (dataValue === developerID) {
      let attribute = row.getElementsByTagName("td");
      attribute[1].innerHTML = parsedData.developerName;
      attribute[2].innerHTML = parsedData.address;
      attribute[3].innerHTML = parsedData.city;
      attribute[4].innerHTML = parsedData.state;
      attribute[5].innerHTML = parsedData.zipCode;
      attribute[6].innerHTML = parsedData.email;
      attribute[7].innerHTML = parsedData.contact;
    }
  }
}
