function changeTextById(id, newText) {
    const element = document.getElementById(id);
    element.innerText = newText;
}

// Função que substitui textos de elementos a partir da tag, recebendo essa e o novo texto
    //como parâmetros
function changeTextByTag(tag, newText) {
    const elements = document.getElementsByTagName(tag);

    for(let i in elements) {
        elements[i].innerText = newText;
    }
}

// Função que adiciona uma classe para todos os elementos de uma determinada tag,
    // recebe a tag e nome da classe a ser adicionada
function AddClassByTag(tag, className) {
    const elements = document.getElementsByTagName(tag);

    for(let element of elements) {
        element.classList = className;
    }
}

// Função que muda as cores de elementos HTML a partir de sua classe, rebendo 
    // o nome da classe e uma lista de cores para os elementos da classe
function changeColorsByClass(className, colorsList) {
    const elements = document.getElementsByClassName(className);

    for(i in elements) {
        elements[i].style.color = colorsList[i]
    }
}

// Execução das funções acima após um intervalo de 6 segundos
setTimeout(() => {changeTextById("main-title", "CSS e Java Script para o HTML")}, 6000);

setTimeout(() => {changeTextByTag("button", "Clique aqui para curtir a página")}, 6000);

setTimeout(() => {AddClassByTag("p", "paragraph")}, 6000);

const colors = ["orangered", "dodgerblue", "orange"];
setTimeout(() => {changeColorsByClass("nav-item", colors)}, 6000);