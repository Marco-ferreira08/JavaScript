const botaoAdicionar = document.getElementById("botao-adicionar");
const divTarefas = document.getElementById("div-tarefas");
const inputDescricao = document.getElementById("campo-descricao");


if (localStorage.length === 0) {
	localStorage.setItem("listaTarefas", "[]");
}

// FUnção para adicionar uma nova tarefa
function criaTarefa(descricao) {
	const tarefa = {descricao: descricao, concluida: false};

	if (localStorage.listaTarefas === "[]") {
		localStorage.setItem("listaTarefas", JSON.stringify([tarefa]));
	} else {
		let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
		listaTarefas.push(tarefa);
		localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
	}
}

function addTarefaAoHTML(indice, lista) {
    // Cria a variável tarefa, usando o indice que ela recebe
	let tarefa = lista[indice];
    
    // Cria o container da tarefa, se ela já estiver concluida, ela é estilizada
    const tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa");
    if (tarefa.concluida) {
        tarefaDiv.classList.add("tarefa-concluida");
    }

    // Cria o checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-tarefa");

    // Cria um parágrafo da descrição
    const descricaoP = document.createElement("p");
    descricaoP.classList.add("descricao-tarefa");
    descricaoP.textContent = tarefa.descricao;

    // Cria botão de apagar tarefa
    const botaoApagar = document.createElement("button");
    botaoApagar.classList.add("botao-apagar");
    botaoApagar.textContent = "Apagar";


    // Adiciona um evento ao checkbox para alterar o estilo
    checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        tarefa.concluida = true;
		localStorage.setItem("listaTarefas", JSON.stringify(lista));
        tarefaDiv.classList.add("tarefa-concluida"); // Adiciona estilo concluído
    } else {
        tarefa.concluida = false;
		localStorage.setItem("listaTarefas", JSON.stringify(lista));
        tarefaDiv.classList.remove("tarefa-concluida"); // Remove estilo concluído
    }
    });

    // Adiciona um envento ao botao apagar para remover um item da lista de tarefas
    botaoApagar.addEventListener("click", () => {
        // Cria-se uma nova lista que conterá todos os itens atuais do localStorage
            // com exceção do item com o índice do item que foi clicado
        let novaLista = [];
        for (let i in JSON.parse(localStorage.listaTarefas)) {
            if (i !== indice) {
                novaLista.push(JSON.parse(localStorage.listaTarefas)[i]);
            }
        }
        localStorage.setItem("listaTarefas", JSON.stringify(novaLista));
        console.log(localStorage.listaTarefas)
        
        divTarefas.removeChild(tarefaDiv);
    })

    // Monta a tarefa na div    
    tarefaDiv.appendChild(checkbox);
    tarefaDiv.appendChild(descricaoP);
    tarefaDiv.appendChild(botaoApagar);
    //
    //
    // Adiciona a tarefa ao container principal
    divTarefas.appendChild(tarefaDiv);
    console.log(tarefa)
}


// Função que carrega todas as tarefas existentes na página
function carregarTarefas() {
	const tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
	for ( let i in tarefas) {
		addTarefaAoHTML(i, tarefas);
	}
}

// Adiciona envento ao botão de adicionar para que ele adicione uma nova tarefa
botaoAdicionar.addEventListener("click", () => { 
    criaTarefa(inputDescricao.value);
    window.location.reload();
});

carregarTarefas();