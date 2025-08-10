const htmlMain = document.getElementsByTagName("main")[0];
const postInput = document.getElementById("post-field");
const postButton = document.getElementById("post-button");
const userNameInput = document.getElementById("username-field");
const avatarInput = document.getElementById("avatar-field");
const saveUserButton = document.getElementById("saveUser-button");
const profileDiv = document.getElementById("user-profile");

// Função que carrega todos os items do usuário no HTML
function loadUserDataInHTML() {
    // Extraindo dados do usuário no localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Criando elemento para exibir a foto do usuário
    const profileAvatar = document.createElement("img");
    profileAvatar.id = "profile-avatar";
    profileAvatar.src = userData.avatar;

    const profileP = document.createElement("P");
    profileP.innerText = "Seu nome:";

    // Criando elemento para exibir o nome do usuário
    const profileUserName = document.createElement("strong");
    profileUserName.id = "profile-userName"
    profileUserName.innerText = userData.userName;

    // Adicionando ao Elementos ao HTML
    profileDiv.appendChild(profileAvatar);
    profileDiv.appendChild(profileP);
    profileDiv.appendChild(profileUserName);

    // Adinando os valores do nome e foto seus respectivos inputs
    userNameInput.value = userData.userName;
    avatarInput.value = userData.avatar;
}

// Adicionando um usuário Guest caso já não haja nenhum
if (! localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify({userName: "Guest", avatar:"https://placecats.com/poppy/400/400"}));
}

// Carregado dados do usuárioS
loadUserDataInHTML();

// Criando um array vazio no localStorage para armazenar o feed caso esse não exista
if (! localStorage.getItem("feed")) {
    localStorage.setItem("feed", "[]");
}

// Adicionando função de salvar usuário ao botão "Salvar"
saveUserButton.addEventListener("click", async () => {
    // Reconlhendo dados dos inúts e os armazenando
    const userName = userNameInput.value;
    const userAvatar = avatarInput.value;
    const userData = {userName: userName, avatar: userAvatar};
    localStorage.setItem("userData", JSON.stringify(userData));

    // Lipando dados antigos do HTML e recarregando os novos
    profileDiv.innerHTML = "";
    loadUserDataInHTML();

    // Mostrando ao usuário que seus novos dados foram salvos
    alert("Dados de usuário salvos com sucesso!");
})

/* Função que cria e retorna um objeto de post rebendo como parâmetro o texto da postagem
e o link da imagem */
const createPostObject = (text, imgLink) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const postObject = {date: new Date(), userName: userData.userName, avatar: userData.avatar,
        postText: text, catImg: imgLink, likeN: 0
    }

    return postObject;
}

// Função que gera uma String com data e hora da postagem, rebendo com parâmetro um objeto Date
const generateTimeString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    console.log(hour, minute)
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year} - ${hour}:${minute < 10 ? "0" + minute : minute}`;
}

/* Função que adiciona um post ao HTML rebendo como parâmetro o seu índice no array de objetos 
do local Storage */
function addPostToHTML(index) {
    // Extraindo o array de posts e o respectivo post
    const feed = JSON.parse(localStorage.getItem("feed"));
    let postObject = feed[index] ;

    // Criando div para armazenar o post
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // Criando div para armazenar as informações do topo do post
    const postTopDiv = document.createElement("div");
    postTopDiv.classList.add("post-top");

    // Criando img com o avatar do usuário dono do post
    const avatarImg = document.createElement("img");
    avatarImg.src = postObject.avatar;
    avatarImg.classList.add("post-avatar");

    // Criando elemento para exibir o nome do usuário
    const userName = document.createElement("strong");
    userName.classList.add("post-userName");
    userName.innerText = postObject.userName;

    // Criando p para exibir a data e hora do post
    const dateP = document.createElement("p");
    dateP.classList.add("post-date");
    const date = new Date(postObject.date);
    dateP.textContent = generateTimeString(date);

    // Criação de um p itermediário (mais explicações no CSS da página)
    const middleP = document.createElement("p");
    middleP.classList.add("middle");

    // Criação do botão de likes
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");

    // Criando da imagem do botão
    const likeImg = document.createElement("img");
    likeImg.src = "img/heart.png";
    // Adiconando imagem ao botão
    likeButton.appendChild(likeImg);

    // Criando p para exibir likes
    const likeP = document.createElement("p");
    likeP.classList.add("like-number");
    likeP.innerText = postObject.likeN;

    // Criando p com o conteúdo do post
    const postP = document.createElement("p");
    postP.innerText = postObject.postText;

    // Criando a imagem de gato
    const catImg = document.createElement("img");
    catImg.classList.add("post-image")
    catImg.src = postObject.catImg;

    
    // Adicionando elemento à div post-top
    postTopDiv.appendChild(avatarImg);
    postTopDiv.appendChild(userName);
    postTopDiv.appendChild(dateP);
    postTopDiv.appendChild(middleP);
    postTopDiv.appendChild(likeButton);
    postTopDiv.appendChild(likeP);

    // Adicionado elementos ao HTML
    postDiv.appendChild(postTopDiv);
    postDiv.appendChild(postP);
    postDiv.appendChild(catImg);
    htmlMain.appendChild(postDiv);

    // Colocando o cursor sobre o botão de like ele fica mais escuro
    likeImg.addEventListener("mouseover", () => {
        likeImg.src = "img/heart2.png"
    })

    // Tirando o cursor do botão de like ele volta à cor original
    likeImg.addEventListener("mouseout", () => {
        likeImg.src = "img/heart.png"
    })

    // Ao clicar o botão de like o número de likes aumenta (inclusive no localStorage)
    likeButton.addEventListener("click", () => {
        postObject.likeN ++;
        localStorage.setItem("feed", JSON.stringify(feed));
        likeP.innerText = postObject.likeN;
    })
}

// Função para carregar todos os posts da página no HTML
const loadAllPosts = () => {
    const feed = JSON.parse(localStorage.getItem("feed"));
    for (let i in feed) {
        addPostToHTML(i);
    }
}

loadAllPosts();

// Função que retorna o link de uma foto gato obtido através da API
const getApiImage = async () => {
    const apiResponse = await fetch("https://api.thecatapi.com/v1/images/search");
    const apiData = await apiResponse.json();

    return apiData;
}

// Clicando no botão "Postar"
postButton.addEventListener("click", async () => { 
    try {
        // Busca-se uma imagem pela API e cria-se um post adicionando-o ao localStorage
        const apiData = await getApiImage();
        const newPost = createPostObject(postInput.value, apiData[0].url);
        postInput.value = "";
        let feed = JSON.parse(localStorage.getItem("feed"));
        feed.push(newPost);
        localStorage.setItem("feed", JSON.stringify(feed));
        // Aciona o novo post ao HTML
        addPostToHTML(feed.length - 1);
        
    } catch (error) {
        // Em caso de erro esse é exibido
        console.log("Erro ao buscar imagem da API: ", error);
    }
});
