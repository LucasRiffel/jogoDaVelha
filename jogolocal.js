const quadrados = document.querySelectorAll('.caixa');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const jogadaAtualElemento = document.getElementById('jogada-atual');
const placarXElemento = document.getElementById('placar-x');
const placarOElemento = document.getElementById('placar-o');
const placarVelhasElemento = document.getElementById('placar-velhas');

const somX = new Audio('../audio/audio-x-o.wav');
const somO = new Audio('../audio/audio-x-o.wav');

function sortearJogadorInicial() {
    const numeroAleatorio = Math.random();
    
    if (numeroAleatorio < 0.5) {
        return 'X'; 
    } else {
        return 'O'; 
    }
}

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let jogadorAtual = sortearJogadorInicial();
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
    });
});

function reiniciarJogo() {
    jogadorAtual = sortearJogadorInicial();
    
    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
    });

    atualizarJogadaAtual();
}
