// Get objects to modify
let updateGameForm = document.getElementById('update-game-form-ajax');

// Modify required objects
updateGameForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    // Get form fields data is needed from
    let inputGameID = document.getElementById("mySelect");
    let inputDeveloperID = document.getElementById("input-developerID-update");
    let inputTitle = document.getElementById("input-title-update");
    let inputDescription = document.getElementById("input-description-update");
    let inputReleaseDate = document.getElementById("input-releaseDate-update");

    // Get the values from form fields
    let gameIDValue = inputGameID.value;
    let developerIDValue = inputDeveloperID.value;
    let titleValue = inputTitle.value;
    let descriptionValue = inputDescription.value;
    let releaseDateValue = inputReleaseDate.value;

    // Create JS object with data to send
    // Put data to send in a JS object
    let data = {
        gameID: gameIDValue,
        developerID: developerIDValue,
        title: titleValue,
        description: descriptionValue,
        releaseDate: releaseDateValue
    }
    
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to table
            updateRow(xhttp.response, gameIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request, wait for response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, gameID){
    let parsedData = JSON.parse(data)
    let table = document.getElementById("games-table");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let dataValue = row.getAttribute("data-value");

        if (dataValue === gameID) {
            let attribute = row.getElementsByTagName("td");
            attribute[1].innerHTML = parsedData.games[0].developerName;
            attribute[2].innerHTML = parsedData.games[0].title;
            attribute[3].innerHTML = parsedData.games[0].description;
            attribute[4].innerHTML = parsedData.games[0].releaseDate;
        }
    }
}