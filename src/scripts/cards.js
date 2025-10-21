// Classe que gerencia os cards do jogo
class CardManager {
    flippedCards = new Set(); // Conjunto para armazenar os cards atualmente virados
    urlFactory;               // Função que gera a URL da imagem do card

    // Construtor da classe, recebe a função que cria a URL das imagens
    constructor(factory) {
        this.urlFactory = factory;
    }

    // Gera um card com base no número do herói
    gen(heroNumber) {
        let template = document.getElementById("cardTemplate"); // Pega o template do card no HTML
        let clone = template.content.cloneNode(true);           // Clona o template para criar um novo card
        
        let img = clone.querySelector('img'); // Seleciona a imagem dentro do card

        img.setAttribute('src', this.urlFactory(heroNumber)); // Define a imagem usando a função urlFactory

        // Adiciona o evento de clique no card
        clone.children[0].addEventListener('click',
            event => this.onClick(event)
        );
        return clone; // Retorna o card pronto para ser adicionado ao tabuleiro
    }

    // Evento disparado ao clicar no card
    onClick(event) {
        if (this.flippedCards.size == 2) { // Se já houver 2 cards virados
            this.endTurn();                // Finaliza a jogada (verifica se combinam ou não)
        }
        else {
            this.flip(event.target);       // Caso contrário, vira o card clicado
        }
    }

    // Vira um card e adiciona ao conjunto de cards virados
    flip(cardNode) {
        cardNode.children[0].classList.add('selected'); // Adiciona classe CSS para mostrar o card virado
        this.flippedCards.add(cardNode);               // Adiciona o card ao conjunto
    }

    // Marca o card como combinado e o desvira
    disable(cardNode) {
        cardNode.children[0].classList.add('matched'); // Adiciona classe CSS de "combinado"
        this.unFlip(cardNode);                         // Remove a classe de "selecionado"
    }

    // Desvira o card (remove a classe de seleção)
    unFlip(cardNode) {
        cardNode.children[0].classList.remove('selected');
    }

    // Verifica se os dois cards virados são iguais
    check() {
        // Pega as URLs das imagens dos cards virados
        let urls = [...this.flippedCards].map((card)=>{
            return card.querySelector('img').src;
        });

        return urls[0] == urls[1]; // Retorna true se forem iguais
    }

    // Finaliza a jogada atual
    endTurn() {
        // Se os cards combinarem, chama disable, caso contrário chama unFlip
        let handler = this.check() ? (card) => this.disable(card) : this.unFlip;

        this.flippedCards.forEach(handler); // Aplica o handler em cada card virado
        this.flippedCards.clear();          // Limpa o conjunto para a próxima jogada
    }
}
