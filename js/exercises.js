/* 
S'agafa la URL de la pàgina, on s'especifica el grup muscular que s'utilitzarà a la crida de la API
*/
let pageUrl = new URL(window.location.href);
console.log(pageUrl.href);
let groupName = pageUrl.href.split("?").pop().replace("%20", " ");
console.log(groupName);
let exercisesList;
let title = document.getElementById("ex-title");
let exerciseGrid = document.getElementById("ex-grid")
let loadMoreButton = document.getElementById("load-more-button");
const INITIAL_ITEMS = 16;
const LOAD_ITEMS = 8;

title.innerHTML = groupName;
fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${groupName}`, {
    method: "GET",
    headers: {
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        "x-rapidapi-key": "a344beba5amshf2684e19cf99434p146417jsnbc28373aca72",
    },
})
    .then((response) =>
        response.json().then((data) => {
            exercisesList = data;
            console.log(exercisesList);
            console.log(data);

            for (let i = 0; i < INITIAL_ITEMS; i++) {
                addExerciseTile(exercisesList[i]);
            }
            if (exercisesList.length > 16) {
                loadMoreButton.style.visibility = "visible";
            }
        })
    )
    .catch((err) => {
        console.log(err);
    });

//Funció que afegeix el GIF i el nom de cada exercici retornat a la crida
function addExerciseTile(data) {
    let exerciseTile = document.createElement("div");
    exerciseTile.classList.add("ex-tile");

    let exerciseImage = document.createElement("img");
    exerciseImage.src = data["gifUrl"]
    let exerciseName = document.createElement("h3");
    exerciseName.innerHTML = data["name"];

    exerciseTile.appendChild(exerciseImage);
    exerciseTile.appendChild(exerciseName);
    exerciseGrid.appendChild(exerciseTile);
    console.log(exerciseName);

}

//Funció que controla el funcionament del botó de Load More. Mostra 8 exercicis més al clicar el botó.
function loadData() {
    let currentDisplayedItems = document.querySelectorAll("h3").length;
    console.log(currentDisplayedItems);
    let counter = 16;
    for (let i = currentDisplayedItems; i < exercisesList.length; i++) {
        if (counter >= currentDisplayedItems && counter < LOAD_ITEMS + currentDisplayedItems) {
            addExerciseTile(exercisesList[i]);
        }
        counter++;
    }
}

/*
Bloc de codi que controla el funcionament del "burger menú" mitjançant una classe "show" que s'afegeix
o s'elimina cada vegada que es fa clic sobre el botó del menú.
*/
const theBody = document.querySelector("body");
const openNav = document.querySelector(".menu-bar button");
const closeNav = document.querySelector(".close-nav button");
const Navbar = document.querySelector(".navbar");

//Amagar continguts quan s'obre el burger menu
const main = document.querySelector("main");
const footer = document.querySelector("footer");
function showHide() {
    Navbar.classList.toggle("show");
    main.classList.toggle("display");
    footer.classList.toggle("display");
}
openNav.onclick = showHide;
closeNav.onclick = showHide;
