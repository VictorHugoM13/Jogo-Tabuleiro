// Função que cria a URL da imagem de um card a partir de um número
function urlBuilder(number) {
    // Converte o número para string
    number += "";
    // Garante que a string tenha pelo menos 2 caracteres, adicionando '0' à esquerda se necessário
    number = number.padStart(2, 0);
    // Retorna o caminho da imagem do card no formato 'images/heros/cardXX.jpeg'
    return `images/heros/card${number}.jpeg`;
}

// Cria uma instância do CardManager, usando a função urlBuilder para obter as imagens
let card = new CardManager(urlBuilder);

// Cria uma instância do BoardManager, passando o id do elemento, tamanho do board e o CardManager
let board = new BoardManager("board", 50, card);

// Seleciona elementos do DOM para interagir com o menu e o jogo
let menu = document.getElementById("menu");       // Menu inicial
let select = document.getElementById("numCards"); // Dropdown de quantidade de cards
let start = document.getElementById("start");     // Botão para iniciar o jogo

// Preenche o select com opções de quantidade de cards
for (let i = 4; i <= 10; i += 2) {    
    let n = i ** 2;                    // Calcula o número de cards (i ao quadrado)
    let op = document.createElement('option'); // Cria um elemento <option>
    op.value = n;                      // Define o valor do option
    op.innerHTML = n;                  // Define o texto que será mostrado
    select.appendChild(op);            // Adiciona a opção ao select
}

// Adiciona evento ao botão de start
start.addEventListener('click', ()=>{
    menu.classList.add('hidden');        // Esconde o menu
    board.node.classList.remove('hidden'); // Mostra o tabuleiro
    board.fill(select.value);            // Preenche o tabuleiro com a quantidade de cards selecionada
});

// Adiciona evento ao tabuleiro
board.node.addEventListener('click', ()=>{
    if (board.check()){                  // Verifica se o jogo foi completado
        setTimeout(()=>{
            menu.classList.remove('hidden'); // Mostra o menu novamente
            board.node.classList.add('hidden'); // Esconde o tabuleiro
        }, 2000);                        // Aguarda 2 segundos antes de voltar ao menu
    }
});

start.click();  