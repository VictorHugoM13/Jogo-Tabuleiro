class BoardManager {                     // Declaração da classe BoardManager: gerencia o tabuleiro do jogo
    cardManager;                         // Propriedade: referência ao CardManager (responsável pelas cartas)
    node;                                // Propriedade: nó do DOM onde o tabuleiro é renderizado (ex: <div id="board">)
    numImgs;                             // Propriedade: quantidade de imagens disponíveis (número de heróis diferentes)
    curNumCards;                         // Propriedade: número atual de cartas no tabuleiro (pode ser usada depois)

    constructor(id, numImgs, cardManager){   // Construtor: recebe o id do elemento, número de imagens e o gerenciador de cartas
        this.node = document.getElementById(id); // Busca e guarda o elemento do DOM com o id passado (ex: "board")
        this.numImgs = numImgs;                 // Guarda quantas imagens existem para formar pares
        this.cardManager = cardManager;         // Guarda a instância de CardManager para criar as cartas
    }

    clear() {                             // Método clear: limpa todo o conteúdo do tabuleiro
        this.node.innerHTML = "";         // Remove todo HTML dentro do elemento do tabuleiro (esvazia o board)
    }

    fill(numberCards) {                   // Método fill: preenche o tabuleiro com numberCards cartas
        if (numberCards > 2 * this.numImgs) {   // Verifica se o número pedido excede o máximo de cartas possíveis
            console.error(`Error, not enough images for ${numberCards} cards.`) // Log de erro em console
            numberCards = 2 * this.numImgs;     // Ajusta numberCards para o máximo permitido (2 cartas por imagem)
        }
        this.clear();                          // Limpa o tabuleiro antes de adicionar as novas cartas
        this.addCard(this.cardManager.gen(1)); // Adiciona uma única carta gerada pelo CardManager (atualmente apenas um teste)
    }

    addCard(card){                         // Método addCard: adiciona um elemento de carta ao tabuleiro
        this.node.appendChild(card);       // Insere o nó da carta dentro do elemento #board no DOM
    }
}
