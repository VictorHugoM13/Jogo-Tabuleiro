// Classe que gerencia o tabuleiro do jogo
class BoardManager {
    // Propriedades da classe
    cardManager;   // Instância do CardManager que cria os cards
    node;          // Elemento DOM que representa o tabuleiro
    numImgs;       // Número máximo de imagens (cards) disponíveis
    curNumImgs;    // Número de cards atualmente no tabuleiro

    // Construtor da classe
    constructor(id, numImgs, cardManager) {
        this.node = document.getElementById(id); // Seleciona o elemento do DOM pelo id
        this.numImgs = numImgs;                  // Define o número máximo de imagens
        this.cardManager = cardManager;          // Armazena a instância do CardManager
    }

    // Limpa o tabuleiro, removendo todos os cards
    clear() {
        this.node.innerHTML = "";
    }

    // Preenche o tabuleiro com a quantidade de cards selecionada
    fill(numberCards) {
        // Limita a quantidade de cards ao dobro do número máximo de imagens
        if (numberCards > 2 * this.numImgs) {
            console.error("Erro!");
            numberCards = 2 * this.numImgs;
        }

        numberCards = parseInt(numberCards); // Garante que numberCards seja um número inteiro
        this.curNumCards = numberCards;      // Armazena o número atual de cards no tabuleiro

        this.clear(); // Limpa o tabuleiro antes de adicionar os novos cards

        // Gera uma lista de números aleatórios para os cards e adiciona ao tabuleiro
        this.genRamdonList(numberCards).forEach((number)=>{
            this.addCard(this.cardManager.gen(number)); // Cria e adiciona o card
        });

        this.adjustCss(); // Ajusta o CSS do tabuleiro para distribuir os cards
    }

    // Adiciona um card ao tabuleiro
    addCard(card) {
        this.node.appendChild(card);
    }

    // Gera uma lista aleatória de números representando os cards
    genRamdonList(size){
        // Cria uma lista de 1 até size/2
        let list = Array(size/2).fill().map((_,i)=>i+1);
        console.log({list}); // Mostra a lista inicial no console para depuração

        // Duplica a lista (para ter pares) e embaralha aleatoriamente
        list = [...list, ...list].sort(()=>Math.random()-0.5);

        return list; // Retorna a lista embaralhada
    }

    // Ajusta o CSS do tabuleiro para distribuir os cards de forma uniforme
    adjustCss(){
        let cols = Math.sqrt(this.curNumCards);        // Número de colunas baseado na raiz quadrada da quantidade de cards
        let size = (100/cols - 1);                     // Calcula o tamanho do card em relação à tela
        size += 'vmin';                                // Define a unidade de medida como vmin (proporcional à tela)

        // Define variáveis CSS customizadas para usar no grid do tabuleiro
        document.documentElement.style.setProperty("--numCols", cols);
        document.documentElement.style.setProperty("--size", size);
    }

    // Verifica se todos os cards foram encontrados (combinados)
    check() {
        let flipped = document.getElementsByClassName('matched'); // Pega todos os cards que foram "virados" corretamente
        return flipped.length >= this.curNumCards;               // Retorna true se todos os cards foram combinados
    }
}
