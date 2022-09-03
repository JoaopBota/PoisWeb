//Create a new Point of Interest
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

    } else {
        alert(`Created!`);
    }
}

document.getElementById('CreateButton').addEventListener('click', () => {
    // Read the region from a text field (regionInput)
    const point = {
        ID: document.getElementById('idInput').value,
        name: document.getElementById('nameInput').value,
        type: document.getElementById('typeInput').value,
        country: document.getElementById('countryInput').value,
        region: document.getElementById('regionInput').value,
        lon: document.getElementById('lonInput').value,
        lat: document.getElementById('latInput').value,
        description: document.getElementById('descriptionInput').value,
        recommendations: 0
    };
    ajaxCreate(point);
});