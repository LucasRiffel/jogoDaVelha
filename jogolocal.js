const jogadaAtualElemento = document.getElementById('jogada-atual');

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

let jogadorAtual = 'X';

function verificarVencedor() {
    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (quadrados[a].textContent && quadrados[a].textContent === quadrados[b].textContent && quadrados[a].textContent === quadrados[c].textContent) {
            return true; 
        }
    }
    return false; 
}

const botaoReiniciar = document.getElementById('botao-reiniciar');

botaoReiniciar.addEventListener('click', () => {
    reiniciarJogo();
});

const quadrados = document.querySelectorAll('.caixa');
quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', () => {
        if (!quadrado.textContent) {
            quadrado.textContent = jogadorAtual;
            
            if (verificarVencedor()) {
                alert(`O jogador ${jogadorAtual} venceu!`);
                reiniciarJogo();
            } else if (verificarEmpate()) { 
                alert('Empate!');
                reiniciarJogo();
            } else {

                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
                atualizarJogadaAtual();
            }
        }
    });
});


function verificarEmpate() {

    return [...quadrados].every(quadrado => quadrado.textContent);
}


function reiniciarJogo() {

    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
    });

    jogadorAtual = 'X';
}



function atualizarJogadaAtual() {
    jogadaAtualElemento.textContent = `Jogador atual: ${jogadorAtual}`;
}

