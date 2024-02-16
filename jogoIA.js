const quadrados = document.querySelectorAll('.caixa');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const jogadaAtualElemento = document.getElementById('jogada-atual');
const placarXElemento = document.getElementById('placar-x');
const placarOElemento = document.getElementById('placar-o');
const placarVelhasElemento = document.getElementById('placar-velhas');

const somX = new Audio('./audio/audio-x-o.wav');
const somO = new Audio('./audio/audio-x-o.wav');

function fazerMovimentoIA() {
    const index = movimentoIA(Array.from(quadrados).map(cell => cell.textContent));
    if (index >= 0 && index < quadrados.length) {
        console.log(quadrados[index]);
        quadrados[index].textContent = 'O';
        reproduzirSom();
    }
    if (verificarVencedor()) {
        placarO++;
        atualizarPlacar();
        alert('A IA venceu!');
        reiniciarJogo();
    } else if (verificarEmpate()) {
        placarVelhas++;
        atualizarPlacar();
        alert('Deu velha!');
        reiniciarJogo();
    } else {
        jogadorAtual = 'X';
        atualizarJogadaAtual();
    }
}

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let jogadorAtual = 'X';
let placarX = 0;
let placarO = 0;
let placarVelhas = 0;

function reproduzirSom() {
    if (jogadorAtual === 'X') {
        somX.play();
    } else {
        somO.play();
    }
}

function verificarEmpate() {
    return [...quadrados].every(quadrado => quadrado.textContent);
}

function atualizarJogadaAtual() {
    jogadaAtualElemento.textContent = `Jogador atual: ${jogadorAtual}`;
}

function atualizarPlacar() {
    placarXElemento.textContent = `Vitórias X: ${placarX}`;
    placarOElemento.textContent = `Vitórias O: ${placarO}`;
    placarVelhasElemento.textContent = `Empates: ${placarVelhas}`;
}

function verificarVencedor() {
    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (quadrados[a].textContent && quadrados[a].textContent === quadrados[b].textContent && quadrados[a].textContent === quadrados[c].textContent) {
            return true;
        }
    }
    return false;
}

atualizarJogadaAtual();
atualizarPlacar();

botaoReiniciar.addEventListener('click', () => {
    reiniciarJogo();
});

quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', () => {
        if (!quadrado.textContent) {
            quadrado.textContent = jogadorAtual;
            quadrado.classList.add(`jogador-${jogadorAtual}`);
            reproduzirSom();
            if (verificarVencedor()) {
                if (jogadorAtual === 'X') {
                    placarX++;
                } else {
                    placarO++;
                }
                atualizarPlacar();
                alert(`O jogador ${jogadorAtual} venceu!`);
                reiniciarJogo();
            } else if (verificarEmpate()) {
                placarVelhas++;
                atualizarPlacar();
                alert('Deu velha!');
                reiniciarJogo();
            } else {
                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
                atualizarJogadaAtual();
            }
        }
        if (jogadorAtual === 'O') {
            fazerMovimentoIA();
        }
    });
});

    quadrados = document.querySelectorAll('.caixa');
        quadrados.forEach(quadrado => {
        quadrado.addEventListener('click', () => {
            if (!quadrado.textContent) {
                quadrado.textContent = jogadorAtual;
                reproduzirSom();
                if (verificarVencedor()) {
                    if (jogadorAtual === 'X') {
                        placarX++;
                    } else {
                        placarO++;
                    }
                    atualizarPlacar();
                    alert(`O jogador ${jogadorAtual} venceu!`);
                    reiniciarJogo();
                } else if (verificarEmpate()) {
                    placarVelhas++;
                    atualizarPlacar();
                    alert('Deu velha!');
                    reiniciarJogo();
                } else {
                    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
                    atualizarJogadaAtual();
                    if (jogadorAtual === 'O') {
                        fazerMovimentoIA();
                    }
                }
            }
        });
    });

function movimentoIA(tabuleiro) {
    let posicoesDisponiveis = [];
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === '') {
            posicoesDisponiveis.push(i);
        }
    }

    if (posicoesDisponiveis.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * posicoesDisponiveis.length);
        return posicoesDisponiveis[indiceAleatorio];
    } else {
        return -1;
    }
}


function reiniciarJogo() {
    jogadorAtual = 'X';

    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
    });

    atualizarJogadaAtual();
}