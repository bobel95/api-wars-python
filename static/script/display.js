let nextPage = null;
let prevPage = null;
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#previous");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("#closeBtn");
const modalTable = document.querySelector("#modalTable");
const content = document.querySelector(".content");


closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", closeModal);


function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


function displayResidents (e) {
    let peopleIds = e.target.dataset.people.split(',');
    
    modalTable.innerHTML = ``;
    let residents = '';
    for (let i = 0; i < peopleIds.length; i++) {
        fetch(`https://swapi.dev/api/people/${peopleIds[i]}/`)
        .then(res => res.json())
        .then(data => addResident(data));
    }

    modal.style.visibility="visible";
}


function addResident (data) {
    modalTable.innerHTML +=
        `
        <div class="card card-modal">
        <span class="title">${data.name}</span>
        <table class="table-in-modal">
            <tr>
                <td>Height</td>
                <td>${data.height}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${data.mass}</td>
            </tr>
            <tr>
                <td>Hair color</td>
                <td>${data.hair_color}</td>
            </tr>
            <tr>
                <td>Skin color</td>
                <td>${data.skin_color}</td>
            </tr>
            <tr>
                <td>Eye color</td>
                <td>${data.eye_color}</td>
            </tr>
            <tr>
                <td>Birth year</td>
                <td>${data.birth_year}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${data.gender}</td>
            </tr>
        </table>
        </div>`;

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
    nextPage = data.next ? data.next.replace('http', 'https') : null;
    prevPage = data.previous ? data.previous.replace('http', 'https') : null;

    // Check if user is logged in
    let islogged = isLogged();
    // console.log(islogged);

    // Disable buttons as needed
    disableButtons(prevPage, nextPage);
    
    // Add table headers
    // dataTable.innerHTML = 
    //     `<tr>
    //         <th>Name</th>
    //         <th>Diameter</th>
    //         <th>Gravity</th>
    //         <th>Climate</th>
    //         <th>Terrain</th>
    //         <th>Surface Water (%)</th>
    //         <th>Population</th>
    //         <th>Residents</th>
    //         ${islogged != 0 ? "<th>Favorite</th>" : ""}
    //     </tr>`;
    content.innerHTML = '';

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
                    ${resNum} known resident(s)
                </button>
                `;
        } else {
            residents = `<span class="residents">No known residents</span>`;
        }

        let favoriteButton = `
            <button class="fav-btn">
                <img src="/static/img/upvote.png" alt="Vote" class="favorite" data-pid="${planetId}" data-pname="${data.results[i].name}"></img>
            </button>`

        let imgId = parseInt(data.results[i].url.split('/')[5]);
        let imgUrl = parseInt(imgId) < 22 ? `/static/img/${imgId}.jpg` : `/static/img/placeholder.jpeg`;


        // Insert data in table
        // dataTable.innerHTML += 
        //     `<tr>
        //         <td>${data.results[i].name}</td>
        //         <td>${diameter}</td>
        //         <td>${data.results[i].gravity}</td>
        //         <td>${data.results[i].climate}</td>
        //         <td>${data.results[i].terrain}</td>
        //         <td>${water}</td>
        //         <td>${population}</td>
        //         <td>${residents}</td>
        //         ${islogged != 0 ? favoriteButton : ""}
        //     </tr>`;

        content.innerHTML += 
            `
            <div class="card card-grid">
                <div class="img-title">
                    <span class="planet-title">${data.results[i].name}</span>
                    <img class="planet-img" src="${imgUrl}"></img>
                </div>
                <div class="table-container">
                    <table class="planet-data" id="planet-data">
                        <tr>
                            <td>Diameter</td>
                            <td>${diameter}</td>
                        </tr>
                        <tr>
                            <td>Gravity</td>
                            <td>${data.results[i].gravity}</td>
                        </tr>
                        <tr>
                            <td>Climate</td>
                            <td>${data.results[i].climate}</td>
                        </tr>
                        <tr>
                            <td>Terrain</td>
                            <td>${data.results[i].terrain}</td>
                        </tr>
                        <tr>
                            <td>Surface water</td>
                            <td>${water}</td>
                        </tr>
                        <tr>
                            <td>Population</td>
                            <td>${population}</td>
                        </tr>                    
                    </table>
                    </div>
                <div class="residents-container">
                    ${residents}
                    ${islogged != 0 ? favoriteButton : ""}
                </div>
            </div>
            `
    }
}


function addStats(data) {
    modalTable.innerHTML = `<div class="flash"><h1>Voted planets</h1></div>`;

    for (let i = 0; i < data.length; i++) {
        modalTable.innerHTML += `
            <div class="card card-modal">
                <span class="title">${data[i].planet} - ${data[i].votes} votes</span>
            </div>`;
    }
    modal.style.visibility = "visible";
}


function closeModal () {
    modal.style.visibility = "hidden";
}


export { nextPage, prevPage, renderData, addResident, displayResidents, addStats, topFunction }
