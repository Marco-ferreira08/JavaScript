const nameInput = document.getElementById("name-field");
const likeButton = document.getElementById("like-button");
const likeParagraph = document.getElementById("likes-feedback");
const clearButton = document.getElementById("clear-likes");

if (localStorage.length === 0) {
    localStorage.setItem("personList", [])
}

const checkName = (name) => {
    const personList = localStorage.personList.split(",");
    for (let people of personList) {
        if (name.toLowerCase() === people.toLowerCase()) {
            return true;
        } 
    }
    return false;
}

function addName() {
    if (checkName(nameInput.value) === false) {
        if (localStorage.personList === "") {
            localStorage.setItem("personList", nameInput.value)
        } else {
            let personArray = localStorage.personList.split(",");
            personArray.push(nameInput.value);
            localStorage.setItem("personList", personArray.toString())
        }
        
    } else {
        alert("Este nome já está sendo usado.");
    }
    console.log(localStorage.personList);
}

function paragraphTextGenerate() {
    const personList = localStorage.personList.split(",");

    if (localStorage.personList === "") {
        likeParagraph.innerText = "Ninguém curtiu esta página";
    } else if (personList.length === 1) {
        likeParagraph.innerHTML = `"${personList[0]}" curtiu esta página`;
    } else if (personList.length === 2) {
    likeParagraph.innerText = `"${personList[0]}" e "${personList[1]}" curtiram esta página`;
    } else if (personList.length === 3) {
    likeParagraph.innerHTML = `"${personList[0]}", "${personList[1]}" e mais 1 pessoa curtiram esta página`;
    } else if (personList.length >= 3) {
    likeParagraph.innerHTML = `"${personList[0]}", "${personList[1]}" e mais ${(personList.length - 2)} pessoas curtiram esta página`;
    }
}

paragraphTextGenerate();
likeButton.addEventListener('click', () => {
    addName();
    nameInput.value = "";
    paragraphTextGenerate();
})

clearButton.addEventListener("click", () => {
    localStorage.clear();
    likeParagraph.innerText = "Ninguém curtiu esta página";
})
