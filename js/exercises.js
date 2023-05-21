/* 
S'agafa la URL de la pàgina, on s'especifica el grup muscular que s'utilitzarà a la crida de la API
*/
let pageUrl = new URL(window.location.href);
console.log(pageUrl.href);
let groupName = pageUrl.href.split("?").pop().replace("%20", " ");
console.log(groupName);
let exercisesList;
let title = document.getElementById("ex-title");
let exerciseGrid = document.getElementById("ex-grid");

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
            exercisesList = data.slice(0, 16);
            console.log(exercisesList);
            console.log(data);

            for (let i = 0; i < exercisesList.length; i++) {
                addExerciseTile(exercisesList[i]);
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
