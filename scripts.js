async function ajaxSearch(regionInput) {
    try {
        // Send a request to remote URL
        const response = await fetch(`/pointsofinterest/search/${regionInput}`);

        // Parse the JSON.
        const regions = await response.json();

        //Create markers for each JSON object
        for (region of regions) {
            const regionMarker = L.marker([region.lat, region.lon]).addTo(map);
            regionMarker.bindPopup(region.name + '<br />' + region.description);
        }
        // Loop through the array of JSON objects and add the results to a <div>
        let html = "";
        regions.forEach(region => {
            html += `ID: ${region.ID} | Name: ${region.name} | Type: ${region.type} | Country: ${region.country} | Region: ${region.region} | Longitude: ${region.lon} | Latitude: ${region.lat}| Description: ${region.description} | Recommendations: ${region.recommendations} <input type='button' value='Recommend!' onclick='recommend(${region.ID})' /> <br />`;
        });
        document.getElementById('results').innerHTML = html;

    } catch {
        alert(`Error: Empty Search`);
    }
};

// Make the AJAX run when we click a button
document.getElementById('SearchButton').addEventListener('click', () => {
    // Read the region from a text field (regionInput)
    const region = document.getElementById('regionInput').value;
    ajaxSearch(region);
});

// Increase recommendations by +1
async function recommend(pointID) {
    const response = await fetch(`/pointsofinterest/recommend/${pointID}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    alert(`Added a Reccomendation!`);
}
////Create a new Point of Interest
async function ajaxCreate(point) {
    const response = await fetch('/pointsofinterest/create', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(point)
    });
    if (response.status == 500) {
        alert(`Error: Missing details!`);

    } else if (response.status == 401) {
        alert(`Login First!`);
    } else {
        alert(`Created!`);
    }
};

document.getElementById('CreateButton').addEventListener('click', () => {
    // Read the region from a text field (regionInput)
    const point = {
        ID: document.getElementById('idInput').value,
        name: document.getElementById('nameInput').value,
        type: document.getElementById('typeInput').value,
        country: document.getElementById('countryInput').value,
        region: document.getElementById('regionNameInput').value,
        lon: document.getElementById('lonInput').value,
        lat: document.getElementById('latInput').value,
        description: document.getElementById('descriptionInput').value,
        recommendations: 0
    };
    ajaxCreate(point);
});
async function ajaxLogin(username, password) {
    const response = await fetch(`/login/${username}/${password}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.status == 404) {
        alert(`Error: Incorrect login Info!`);

    } else if (response.status == 401) {
        alert(`Error: Incorrect login Info!`);

    } else {
        let html = "";
        html += `<h3>Logged in as ${username}<h3>`
        alert(`Successfully Logged in!`);
        document.getElementById('loginForm').innerHTML = html;
        document.getElementById('logoutButton').style.display = 'block';
    }
};

document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('userInput').value
    const password = document.getElementById('passwordInput').value
    ajaxLogin(username, password);
});



async function ajaxLogout() {
    const response = await fetch(`/logout`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    alert(`Successfully Logged off!`);
    let html = "";
    html += `<h2>Login</h2><label for="userInput">Username:</label><br>
    <input type="text" id="userInput"><br>
    <label for="passwordInput">Password:</label><br>
    <input type="text" id="passwordInput">
    <button id="loginButton">Login</button>
    <div id="loginOutput">`
    document.getElementById('loginForm').innerHTML = html;
    document.getElementById('logoutButton').style.display = 'none';
};

document.getElementById('logoutButton').addEventListener('click', () => {
    ajaxLogout();
});

//MAP

const map = L.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);

const pos = [50.908, -1.4];
map.setView(pos, 14);
const marker = L.marker(pos).addTo(map);
marker.bindPopup("My Location");

//Creates inputs to create a new marker, by clicking on the map
map.on("click", e => {
    let html = "";
    const position = [e.latlng.lat, e.latlng.lng];
    const marker2 = L.marker(position).addTo(map);
    html +=
        `<h4>ID</h4>
        <input type="text" id="idInput">
        <h4>Name</h4>
        <input type="text" id="nameInput">
        <h4>Type</h4>
        <input type="text" id="typeInput">
        <h4>Country</h4>
        <input type="text" id="countryInput">
        <h4>Region</h4>
        <input type="text" id="regionNameInput">
        <h4>Latitude</h4>
        <input type="text" id="latInput" value="${e.latlng.lat}">
        <h4>Longitude</h4>
        <input type="text" id="lonInput" value="${e.latlng.lng}">
        <h4>Description</h4>
        <input type="text" id="descriptionInput">`;
    document.getElementById('create').innerHTML = html;
    marker2.bindPopup(html);
    document.getElementById('CreateButton').style.display = 'block';
});










