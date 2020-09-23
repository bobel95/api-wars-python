let nextPage = null;
let prevPage = null;
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#previous");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("#closeBtn");
const modalTable = document.querySelector("#modalTable");
const dataTable = document.querySelector("#dataTable");


closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", closeModal);


function displayResidents (e) {
    let peopleIds = e.target.dataset.people.split(',');
    
    modalTable.innerHTML = 
        `<tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair color</th>
            <th>Skin</th>
            <th>Eye color</th>
            <th>Birth year</th>
            <th>Gender</th>
        </tr>`
    
    for (let i = 0; i < peopleIds.length; i++) {
        fetch(`http://swapi.dev/api/people/${peopleIds[i]}/`)
        .then(res => res.json())
        .then(data => addResident(data));
    }
    modal.style.visibility="visible";
}


function addResident (data) {
    modalTable.innerHTML += 
        `<tr>
            <td>${data.name}</td>
            <td>${data.height} cm</td>
            <td>${data.mass} kg</td>
            <td>${data.hair_color}</td>
            <td>${data.skin_color}</td>
            <td>${data.eye_color}</td>
            <td>${data.birth_year}</td>
            <td>${data.gender}</td>
        </tr>`
}


function disableButtons (prev, next) {
    nextButton.disabled = (!next);
    nextButton.style.backgroundColor = (!next) ? "#aaa" : "rgb(182, 119, 211)";
    
    prevButton.disabled = (!prev);
    prevButton.style.backgroundColor = (!prev) ? "#aaa" : "rgb(182, 119, 211)";
}


function isLogged() {
    let logged = 0;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.origin}/islogged`, false);
    xhr.onload = () => {
        logged = xhr.responseText;
    }
    xhr.send();

    return logged;
}


function renderData (data) {
    // Update the URLs for next/prev page with the new ones
    nextPage = data.next;
    prevPage = data.previous;

    // Check if user is logged in
    // let islogged = isLogged();
    // console.log(islogged);

    // Disable buttons as needed
    disableButtons(prevPage, nextPage);
    
    // Add table headers
    dataTable.innerHTML = 
        `<tr>
            <th>Name</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Surface Water (%)</th>
            <th>Population</th>
            <th>Residents</th>
            
        </tr>`;
        //${islogged != 0 ? "<th>Favorite</th>" : ""}

    // Loop through all the planets data
    for (let i = 0; i < data.results.length; i++) {

        // Get all of the residents IDs for each planet
        let peopleUrl = data.results[i].residents;
        let peopIds = [];
        for (let peop of peopleUrl) {
            let spl = peop.split('/')[5];
            peopIds.push(spl);
        }

        let planetId = data.results[i].url.split('/')[5];

        // Format stuff appropriately
        let population = parseInt(data.results[i].population).toLocaleString('ro'); // 'ro' for dot instead of comma separator
        population = ((population != "NaN") ? population : "unknown");

        let diameter = parseInt(data.results[i].diameter).toLocaleString('ro');
        diameter = ((diameter != "NaN") ? (`${diameter} km`) : "unknown");

        let water = ((data.results[i].surface_water != "unknown") ? (`${data.results[i].surface_water}%`) : "unknown")

        let residents = '';
        let resNum = data.results[i].residents.length;
        if (resNum > 0) {
            residents = 
                `<button class="residents" data-people=${peopIds.join(',')}>
                    ${resNum} resident(s)
                </button>
                `;
        } else {
            residents = "No residents";
        }

        let favoriteButton = `
            <td>
                <span class="favorite" data-pid="${planetId}" data-pname="${data.results[i].name}">&#9733;</span>
            </td>`


        // Insert data in table
        dataTable.innerHTML += 
            `<tr>
                <td>${data.results[i].name}</td>
                <td>${diameter}</td>
                <td>${data.results[i].gravity}</td>
                <td>${data.results[i].climate}</td>
                <td>${data.results[i].terrain}</td>
                <td>${water}</td>
                <td>${population}</td>
                <td>${residents}</td>
                
            </tr>`;
            //${islogged != 0 ? favoriteButton : ""}
    }
}


function addStats(data) {
    modalTable.innerHTML = `
        <tr>
            <th>Planet</th>
            <th>Votes</th>
        </tr>`;

    for (let i = 0; i < data.length; i++) {
        modalTable.innerHTML += `
            <tr>
                <td>${data[i].planet}</td>
                <td>${data[i].votes}</td>
            </tr>`;
    }
    modal.style.visibility = "visible";
}


function closeModal () {
    modal.style.visibility = "hidden";
}


export { nextPage, prevPage, renderData, addResident, displayResidents, addStats}
