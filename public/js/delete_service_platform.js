//    Citation for the following code:
//    Date: 2023/05/24
//    Adapted from:
//    https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteServicePlatform(servicePlatformID) {
    // Put data to send in a JS object
    let data = {
        id: servicePlatformID
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-service-platform-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add new data to table
            deleteRow(servicePlatformID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(servicePlatformID){
    let table = document.getElementById("service-platforms-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == servicePlatformID) {
            table.deleteRow(i);
            deleteDropDownMenu(servicePlatformID);
            break;
       }
    }
}

function deleteDropDownMenu(servicePlatformID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(servicePlatformID)){
        selectMenu[i].remove();
        break;
      } 

    }
  }
