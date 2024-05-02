// Variáveis globais
const suits = ["♠", "♣", "♥", "♦"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
let deck = [];
let discardPile = [];
let playerHand = [];
let playerActionTaken = false; // Variável para controlar se o jogador já realizou uma ação na rodada

// Função para criar o baralho
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  shuffle(deck); // Embaralha o baralho após criá-lo
}

// Função para embaralhar o baralho
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Função para distribuir cartas
function dealCards(deck, numCards) {
  const hand = [];
  for (let i = 0; i < numCards; i++) {
    hand.push(deck.pop());
  }
  return hand;
}

// Função para exibir uma mão de cartas
function displayHand(hand, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  hand.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = `${card.value}${card.suit}`;
    if (card.suit === "♥" || card.suit === "♦") {
      cardDiv.style.color = "red";
    }
    container.appendChild(cardDiv);
  });
}

// Função para exibir a pilha de descarte
function displayDiscardPile(topCard) {
  const discardPileContainer = document.getElementById("discard-pile");
  discardPileContainer.innerHTML = "";

  if (topCard) {
    const topCardDiv = document.createElement("div");
    topCardDiv.classList.add("card");
    topCardDiv.textContent = topCard.value + topCard.suit;
    if (topCard.suit === "♥" || topCard.suit === "♦") {
      topCardDiv.style.color = "red";
    }
    discardPileContainer.appendChild(topCardDiv);
  }
}

// Chamada para criar o baralho
createDeck();

// Evento de clique no topo do baralho
document.getElementById("deck").addEventListener("click", function () {
  if (!playerActionTaken && deck.length > 0) {
    const drawnCard = deck.pop();
    console.log("Carta retirada do baralho: ", drawnCard);
    playerHand.push(drawnCard); // Adiciona a carta ao final da mão do jogador
    console.log("Mão do jogador após adicionar a carta: ", playerHand);
    displayHand(playerHand, "player-hand");

    // Marca que o jogador já pegou uma carta
    playerActionTaken = true;
  } else {
    console.log("O jogador já realizou uma ação ou o baralho está vazio!");
  }
});

// Evento de clique na pilha de descarte
document.getElementById("discard-pile").addEventListener("click", function () {
  if (!playerActionTaken && discardPile.length > 0) {
    const topDiscardedCard = discardPile.pop();
    console.log("Carta retirada da pilha de descarte: ", topDiscardedCard);
    playerHand.push(topDiscardedCard); // Adiciona a carta à mão do jogador
    console.log("Mão do jogador após pegar a carta da pilha de descarte: ", playerHand);
    displayHand(playerHand, "player-hand");
    displayDiscardPile(discardPile[discardPile.length - 1]); // Atualiza a exibição da pilha de descarte

    // Marca que o jogador já pegou uma carta
    playerActionTaken = true;
  } else {
    console.log("O jogador já realizou uma ação ou a pilha de descarte está vazia!");
  }
});

// Evento de clique na mão do jogador para descartar uma carta
document.getElementById("player-hand").addEventListener("click", function (event) {
  if (playerActionTaken) {
    // Se o jogador já pegou uma carta, então ele pode descartar uma
    const clickedCardIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    if (clickedCardIndex !== -1) {
      const discardedCard = playerHand.splice(clickedCardIndex, 1)[0];
      console.log("Carta descartada: ", discardedCard);
      discardPile.push(discardedCard); // Adiciona a carta à pilha de descarte
      console.log("Pilha de descarte após descartar a carta: ", discardPile);
      displayHand(playerHand, "player-hand");
      displayDiscardPile(discardPile[discardPile.length - 1]); // Atualiza a exibição da pilha de descarte

      // Reinicia a variável de controle de ação do jogador
      playerActionTaken = false;
    }
  } else {
    console.log("O jogador precisa primeiro pegar uma carta do baralho ou da pilha de descarte!");
  }
});



// Chamada para exibir a pilha de descarte
const topCardInDiscardPile = { suit: "♠", value: "A" }; // Apenas uma carta como exemplo
displayDiscardPile(topCardInDiscardPile);

// Evento de clique no botão para distribuir cartas
document.getElementById("deal-btn").addEventListener("click", function () {
  playerHand = dealCards(deck, 9); // Atualiza a mão do jogador com as novas cartas distribuídas
  const computerHand = dealCards(deck, 9);
  displayHand(playerHand, "player-hand");
  displayHand(computerHand, "computer-hand");

  // Reinicia a variável de controle de ação do jogador
  playerActionTaken = false;
});
