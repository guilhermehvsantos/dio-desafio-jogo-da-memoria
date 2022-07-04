const CARDS = document.querySelectorAll('.card');
const FLIPPED = document.getElementsByClassName('.flip')
var hasFlippedCard = false;
var firstCard, secondCard; 
let lockBoard = false;
let count = 0

/* Função responsável por virar as cartas */

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

/* Função para verificação das cartas, se forem iguais serão desabilitadas */

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disabledCards ();
        count++

        setTimeout(() =>{
            gameOver()
            
        }, 1500 )
        
        return;
    }

    unflipCards(); 
}

/* Função que irá desabilitar as cartas, após viradas(escolhidas)*/

function disabledCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    reset ();
}

/* função que trava o "tabuleiro" e vira a cartas novamente depois de 2 segundos */

function unflipCards() {
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        reset ();
        

    }, 1500 );
}

function reset () {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

/* função */

(function shuffle() {
    CARDS.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
})();

CARDS.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function gameOver() {
    if((CARDS.length)/2 == count) {
        alert("Parabéns, você concluiu o jogo! Vamos jogar outra vez?");
        setTimeout(() =>{
            count = 0
        reset ();
        CARDS.forEach((card) => {
            card.classList.remove('flip')
            card.addEventListener('click', flipCard)
        })
     
    
        }, 1500 );
        
    
    }

}