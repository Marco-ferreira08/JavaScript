function verificaLivro(titulo) {
    for (let livro of livros) {
        if (titulo.toLowerCase() == livro.titulo.toLowerCase()) {
            return true;
        } 
    }

    return false;
}

function adicionarLivro(titulo, autor, quantidade) {
    let livro = {titulo: titulo, autor: autor, quantidade: quantidade};
    livros.push(livro);
}

function removerLivro(titulo) {
    let livroAtual;
    for (let indice in livros) {
        livroAtual = livros[indice].titulo;
        if (titulo.toLowerCase() == livroAtual.toLowerCase()) {
            livros.splice(indice, 1);
            break
        }
    }
}

function atualizarQuantidade(titulo, novaQuantidade) {
    for (let livro of livros) {
        if (titulo.toLowerCase() == livro.titulo.toLowerCase()) {
            livro.quantidade = novaQuantidade
            break
        }
    }
}

function listarLivros() {
    for (let livro of livros) {
        console.log(livro.titulo);
    }    
}

let livros = [
    {titulo: "Jogos Vorazes", autor: "Suzanne Collins", quantidade: 15},
    {titulo: "História de uma alma", autor: "Teresa de Lisieux", quantidade: 10},
    {titulo: "Harry Potter", autor: "J.K. Rowling", quantidade: 12}
];

console.log("Livros de nosso catálogo:", "\n")
console.log(livros);

console.log();
console.log("------------------------------------------------------------------------------");
console.log();

console.log("Adicionando 'O Iluminado':", "\n")

if (verificaLivro("O Iluminado") == false) {
    adicionarLivro("O Iluminado",  "Stephen King", 18);
} else {
    console.log("Este livro já existe em nosso catálogo!", "\n");
}

// console.log(livros);
listarLivros()

console.log();
console.log("------------------------------------------------------------------------------");
console.log();

console.log("Removendo 'História de uma alma':", "\n")

if (verificaLivro("História de uma alma")) {
    removerLivro("História de uma alma");
} else {
    console.log("Este livro não existe em nosso catálogo!")
    console.log("Por favor tente novamente.", "\n")
}

listarLivros()

console.log();
console.log("------------------------------------------------------------------------------");
console.log();

console.log("Atualizando quantidade do livro 'Jogos Vorazes':", "\n")

if (verificaLivro("Jogos Vorazes")) {
    atualizarQuantidade("Jogos Vorazes", 11)
} else {
    console.log("Este livro não existe em nosso catálogo!")
    console.log("Por favor tente novamente.", "\n")
}

console.log(livros)