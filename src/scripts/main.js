function urlBuilder(number) {       // Declara uma função chamada urlBuilder, que deve gerar o caminho (URL) da imagem da carta
}                                   // Por enquanto está vazia — será completada depois para retornar algo como "images/heros/card01.jpeg"


// --- Instâncias principais do jogo ---
let card = new CardManager(urlBuilder);     // Cria um gerenciador de cartas, passando a função urlBuilder como "fábrica" de URLs
let board = new BoardManager("board", 50, card);  // Cria o gerenciador do tabuleiro, dizendo que o id é "board", existem 50 imagens e o gerenciador de cartas é o 'card'


// --- Pega elementos do HTML ---
let menu = document.getElementById("menu");       // Pega a <div id="menu">, que contém o menu inicial
let select = document.getElementById("numCards"); // Pega o <select> onde o jogador escolhe o número de cartas
let start = document.getElementById("start");     // Pega o botão “start” (iniciar jogo)


// --- Preenche o <select> com opções de tamanho ---
for (let i = 4; i <= 10; i += 2) {    // Loop: i começa em 4 e vai até 10, pulando de 2 em 2 (4, 6, 8, 10)
    let n = i ** 2;                   // Eleva i ao quadrado — ex: 4²=16, 6²=36 — simulando tabuleiros 4x4, 6x6 etc.
    let op = document.createElement('option'); // Cria um elemento <option> dinamicamente
    op.value = n;                     // Define o valor interno da opção como o número calculado
    op.innerHTML = n;                 // Mostra o mesmo número como texto visível
    select.appendChild(op);           // Adiciona essa opção dentro do <select> no HTML
}


// --- Evento do botão START ---
start.addEventListener('click', ()=>{         // Quando o botão "start" for clicado...
    menu.classList.add('hidden');             // Esconde o menu inicial adicionando a classe CSS "hidden"
    board.node.classList.remove('hidden');    // Mostra o tabuleiro, removendo a classe "hidden"
    board.fill(select.value);                 // Preenche o tabuleiro com a quantidade de cartas escolhida no <select>
});


// --- Inicia automaticamente o jogo (sem precisar clicar) ---
start.click();                                // Simula um clique automático no botão "start" assim que o script carrega
