// Get objects to modify
let updatePurchaseForm = document.getElementById('update-purchase-form-ajax');

// Modify objects
updatePurchaseForm.addEventListener("submit", function (e) {
   
    e.preventDefault();
    // Get form fields to get data from
    let inputPurchaseID = document.getElementById("mySelect");
    let inputCustomerID = document.getElementById("input-customerID-update");
    let inputMicrotransactionID = document.getElementById("input-microtransactionID-update");
    let inputDate = document.getElementById("input-date-update");

    // Get values from form fields
    let purchaseIDValue = inputPurchaseID.value;
    let customerIDValue = inputCustomerID.value;
    let microtransactionIDValue = inputMicrotransactionID.value;
    let dateValue = inputDate.value;

    // Put data to send in a JS object
    let data = {
        purchaseID: purchaseIDValue,
        customerID: customerIDValue,
        microtransactionID: microtransactionIDValue,
        date: dateValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-purchase-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add new data to table
            updateRow(xhttp.response, purchaseIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send request and wait for response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, purchaseID){
    let parsedData = JSON.parse(data)
    let table = document.getElementById("purchases-table");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let dataValue = row.getAttribute("data-value");

        if (dataValue === purchaseID) {
            let attribute = row.getElementsByTagName("td");
            attribute[1].innerHTML = parsedData.purchases[0].username;
            attribute[2].innerHTML = parsedData.purchases[0].microtransaction;
            attribute[3].innerHTML = parsedData.purchases[0].date;
        }
    }
}
