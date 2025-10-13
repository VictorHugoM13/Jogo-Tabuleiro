class CardManager {                              // Declaração da classe CardManager: responsável por criar/gerenciar cartas
    flippedCards = new Set();                    // Propriedade: um Set que guarda as cartas atualmente viradas (evita duplicatas)
    urlFactory;                                  // Propriedade: irá conter a função que gera a URL da imagem (ex: urlBuilder)

    constructor(factory) {                       // Construtor: executado quando criamos um new CardManager(...)
        this.urlFactory = factory;               // Guarda a função passada (factory) em this.urlFactory para uso posterior
    }

    gen(heroNumber){                             // Método gen: gera (clona) um elemento de carta com base no template
        let template = document.getElementById("cardTemplate"); // Busca no DOM o <template id="cardTemplate">
        let clone = template.content.cloneNode(true);          // Clona todo o conteúdo do template (true = cópia profunda)

        clone.children[0].addEventListener('click',            // Adiciona um listener de clique ao elemento raiz do clone
            event => this.onClick(event)                       // Quando clicado, chama onClick passando o evento (preserva this)
        );
        return clone;                                          // Retorna o clone pronto para ser inserido no DOM
    }

    onClick(event){                                         // Método onClick: manipulador de evento para cliques nas cartas
        this.flip(event.target);                            // Chama flip com o alvo do evento (o elemento clicado)
    }

    flip(cardNode){                                         // Método flip: vira a carta (visualmente) e registra como virada
        cardNode.children[0].classList.add('selected');     // Adiciona a classe 'selected' ao primeiro filho (ativa o CSS de virar)
        this.flippedCards.add(cardNode);                    // Adiciona o nó da carta ao Set flippedCards
    }

    unFlip(cardNode){                                       // Método unFlip: desfaz a ação de virar (volta para verso)
        cardNode.children[0].classList.remove('selected');  // Remove a classe 'selected' (a carta volta ao estado original)
    }
    disable(cardNode){                                      // Método disable: marca a carta como combinada/removida do jogo
        cardNode.children[0].classList.add('matched');     // Adiciona a classe 'matched' (pode aplicar estilo para pares corretos)
        this.unFlip(cardNode);                              // Chama unFlip para garantir que a classe 'selected' seja removida
    }


}
