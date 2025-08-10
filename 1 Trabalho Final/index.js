//  Definição dos elementos a serem utilizados
const userInput = document.getElementById("username-field");
const searchButton = document.getElementById("search-button");
const resultDiv = document.getElementById("result-div");

//  Função assíncrona que faz a busca pelo usuário na API, recebendo o userName como palavra-cahve
async function searchDev(userName) {
    const devData = await fetch(`https://api.github.com/users/${userName}`);
    const dev = await devData.json();

    return dev;
}

/*  Função que recebe o objeto do usuário enviado pela API e monta outro objeto apenas com as
    informações necessárias */
function createDevObject(object) {
    const devObject = {avatar: object.avatar_url, creatingDate: object.created_at, 
        followersN: object.followers, followingN: object.following, 
        profile: object.html_url, login: object.login, name: object.name};
    
    return devObject;
}

/* Função que pega todas as informações do objeto formado pela função "createDevObject"
    e as insere no HTML da página de forma organizada */
function createHTML(devObject) {
    // Criando img com a foto do desenvolvedor
    const devAvatar = document.createElement("img");
    devAvatar.src = devObject.avatar;

    // Criando a lista em que serão adicionados os dados do desenvolvedor
    const resultUl = document.createElement("ul");

    // Criando Li do link da foto
    const imgLi = document.createElement("li");
    imgLi.textContent = "Link da foto: "

    // Criando link da foto
    const imgA = document.createElement("a");
    imgA.textContent = devObject.avatar;
    imgA.href = devObject.avatar;
    imgA.target = "_blank"

    // Adicionando link da foto ao seu respectivo Li
    imgLi.appendChild(imgA);

    // Criando Li com o nome do dev
    const nameLi = document.createElement("li");
    nameLi.textContent = `Nome: ${devObject.name}`;

    // Criando Li com o login
    const loginLi = document.createElement("li");
    loginLi.textContent = `Login: ${devObject.login}`;

    // Criando Li com o número de seguidores
    const followersLi = document.createElement("li");
    followersLi.textContent = `Seguidores: ${devObject.followersN}`;

    // Criando Li com o número de pessoas que o dev segue
    const followingLi = document.createElement("li");
    followingLi.textContent = `Seguindo: ${devObject.followingN}`;

    // Criando Li da data de cricação do perfil
    const creatingDateLi = document.createElement("li");

    // Pegando a string da data e separando dia, mês e ano
    const date = new Date(devObject.creatingDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Adicionando o texto do Li com a data de criação
    // Caso a data ou o mês sejam menores que 10, é adicionado um zero a fim de seguir o formato DD/MM/AA
    creatingDateLi.textContent = `Data de criação do perfil: 
        ${day < 10 ? '0' + day : day}/${(month + 1) < 10 ? '0' + month : month}/${year}`;

    // Criando Li com o link do perfil
    const profileLi = document.createElement("li");
    profileLi.textContent = "Link do perfil: ";

    // Criando link do perfil
    const profileA = document.createElement("a");
    profileA.textContent = devObject.profile;
    profileA.href = devObject.profile;
    profileA.target = "_blank"
    
    // Adicionando link ao Li
    profileLi.appendChild(profileA);

    // Adiconando os itens da lista (Li) à lista (Ul)
    resultUl.appendChild(imgLi);
    resultUl.appendChild(nameLi);
    resultUl.appendChild(loginLi);
    resultUl.appendChild(followersLi);
    resultUl.appendChild(followingLi);
    resultUl.appendChild(creatingDateLi);
    resultUl.appendChild(profileLi);

    // Adicionando a foto do dev e a lista com seu dados à ao HTML da página
    resultDiv.appendChild(devAvatar);
    resultDiv.appendChild(resultUl);
}

//  Adição do evento click ao botão de busca
searchButton.addEventListener("click", async () => {
    try {
        /* É feita a busca pelo usuário, caso seja identificada a presença da chave "status"
            no objeto retornado, significa que não foi encotrado nenhum usuário */
        const devData = await searchDev(userInput.value);
        if (devData.status) {
            // Definição de um parágrafo indicando que não houve resultados
            resultDiv.innerHTML = '<p id="no-result">Não foram encontrados usuários para esta pesquisa</p>'
        } else {
            // O conteúdo da div de resultados é limpo, para assim serem adicionados os dados do desenvolvedor
            resultDiv.innerHTML = ""
            const devObject = createDevObject(devData);
            createHTML(devObject);
        }      
    } catch (error) {
        console.error("Erro ao buscar os dados do desenvolvedor:", error);
    }
});