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
    placarXElemento.textContent = `Suas Vitórias: ${placarX}`;
    placarOElemento.textContent = `Vitórias da IA: ${placarO}`;
    placarVelhasElemento.textContent = `Velhas: ${placarVelhas}`;
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
                alert(`Você ganhou!`);
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
        let quinas = [0, 2, 6, 8];
        let meio = [1, 3, 5, 7];
        let centro = [4];
    
        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === '') {
                posicoesDisponiveis.push(i);
            }
        }
    
        // Verifica se há um movimento vencedor para a IA
        for (let i = 0; i < posicoesDisponiveis.length; i++) {
            let copiaTabuleiro = [...tabuleiro];
            copiaTabuleiro[posicoesDisponiveis[i]] = 'O'; // Supondo que a IA é 'O'
            if (verificaVitoria(copiaTabuleiro, 'O')) {
                return posicoesDisponiveis[i];
            }
        }
    
        // Verifica se o oponente tem um movimento vencedor e bloqueia
        for (let i = 0; i < posicoesDisponiveis.length; i++) {
            let copiaTabuleiro = [...tabuleiro];
            copiaTabuleiro[posicoesDisponiveis[i]] = 'X'; // Supondo que o oponente é 'X'
            if (verificaVitoria(copiaTabuleiro, 'X')) {
                return posicoesDisponiveis[i];
            }
        }
    
        let quinasDisponiveis = quinas.filter(posicao => posicoesDisponiveis.includes(posicao));
        let meioDisponivel = meio.filter(posicao => posicoesDisponiveis.includes(posicao));
        let centroDisponivel = centro.filter(posicao => posicoesDisponiveis.includes(posicao));
    
        if (quinasDisponiveis.length > 0) {
            let indiceAleatorio = Math.floor(Math.random() * quinasDisponiveis.length);
            return quinasDisponiveis[indiceAleatorio];
        } else if (centroDisponivel.length > 0) {
            return centroDisponivel[0];
        } else if (meioDisponivel.length > 0) {
            let indiceAleatorio = Math.floor(Math.random() * meioDisponivel.length);
            return meioDisponivel[indiceAleatorio];
        } else {
            return -1;
        }
    }
    
    function verificaVitoria(tabuleiro, jogador) {
        // Adicione aqui a lógica para verificar se um jogador ganhou
    }
    
    
    


function reiniciarJogo() {
    jogadorAtual = 'X';

    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
    });

    atualizarJogadaAtual();
}