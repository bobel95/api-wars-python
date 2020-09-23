import { renderData, nextPage, prevPage, displayResidents, addStats } from './display.js';

let planetsData = "http://swapi.dev/api/planets/";

// Load main table 
document.addEventListener("DOMContentLoaded", getData(planetsData));

// Add event listeners for clickable stuff using event delegation
// (one of the ways of adding event listeners to elements created by simply appending to the HTML)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('residents')) {
        displayResidents(e);
    }

    if (e.target.classList.contains('favorite')) {
        let planetId = e.target.dataset.pid;
        let planetName = e.target.dataset.pname;
        let planetInfo = {
            "id": planetId,
            "name": planetName
        }
        sendData(planetInfo);
    }

    if (e.target.classList.contains('stats')) {
        fetch(`${window.origin}/planets-stats`)
        .then(res => res.json())
        .then(data => addStats(data));

    }

    if (e.target.id == 'next') {
        getData(nextPage);
    }

    if (e.target.id == 'previous') {
        getData(prevPage);
    }
});


function getData (dataUrl) {
    // Fetch makes a request on the given URL, using the GET method by default
    // Returns a promise instead of the actual data
    fetch(dataUrl)
        .then(res => res.json())  // So we have to pass it to the .json() method to get to the data
        .then((data) => renderData(data));  // Do something with the obtained data (in this case, renderData)
}


function sendData(data) {
    // Making a POST request using fetch requires passing a second argument (a JSON)
    // Being a POST, it should contain a header and the body
    fetch(`${window.origin}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}