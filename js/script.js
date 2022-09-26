let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaSorteada;
const palavras = [{ nome: 'AMORA' },
{ nome: 'BETERRABA' },
{ nome: 'COMPUTADOR' },
{ nome: 'DESAFIO' },
{ nome: 'GARRAFA' },
{ nome: 'LAPIS DE COR' },
{ nome: 'MEMORIA RAM' },
];

criarPalavraSecreta();
function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length);

    palavraSecretaSorteada = palavras[indexPalavra].nome;
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const palavraTela = document.getElementById('palavra-secreta');
    palavraTela.innerHTML = '';

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            } else {
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        } else {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            } else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra, false);
        comparaListas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla, condicao) {
    if (condicao == false) {
        document.getElementById(tecla).style.background = "#a33232"
        document.getElementById(tecla).style.color = "#ffffff"
    } else {
        document.getElementById(tecla).style.background = "#48d05f"
        document.getElementById(tecla).style.color = "#ffffff"
    }
}

async function comparaListas(letra) {
    const position = palavraSecretaSorteada.indexOf(letra);
    if (position < 0) {
        tentativas--;
        carregaImagemForca();
        if (tentativas == 0) {
            abreModal('OPS!', 'Não foi dessa vez... A palava secreta era <br>' + palavraSecretaSorteada);
            novoJogo();
        }
    } else {
        mudarStyleLetra('tecla-' + letra, true);
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] == letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }
    }
    if (vitoria == true) {
        abreModal('Parabens!', 'Você venceu!!');
        tentativas = 0;
        novoJogo();
    }
}

async function novoJogo() {
    while (jogarNovamente == true) {
        document.getElementById('btnReiniciar').style.backgroundColor = 'khaki';
        document.getElementById('btnReiniciar').style.scale = 1.2;
        await atraso(500);
        document.getElementById('btnReiniciar').style.backgroundColor = 'springGreen';
        document.getElementById('btnReiniciar').style.scale = 1;
        await atraso(500);
    }
}

async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo));
}

function carregaImagemForca() {
    switch (tentativas) {
        case 5:
            document.getElementById('imagem').style.background = "url('./img/forca2.png')"
            break;
        case 4:
            document.getElementById('imagem').style.background = "url('./img/forca3.png')"
            break;
        case 3:
            document.getElementById('imagem').style.background = "url('./img/forca4.png')"
            break;
        case 2:
            document.getElementById('imagem').style.background = "url('./img/forca5.png')"
            break;
        case 1:
            document.getElementById('imagem').style.background = "url('./img/forca6.png')"
            break;
        case 0:
            document.getElementById('imagem').style.background = "url('./img/forca7.png')"
            break;
        default:
            document.getElementById('imagem').style.background = "url('./img/forca1.png')"
            break;
    }
}

function abreModal(titulo, mensagem) {
    let modalTitulo = document.getElementById('exampleModalLabel');
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = mensagem;

    $('#myModal').modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    jogarNovamente = false;
    location.reload();
});

// Adicionar palavra

const abrirModal = document.querySelector('#abrirModal')
const fecharModal = document.querySelector('#fecharModal')
const modal = document.querySelector("#modal")
const fade = document.querySelector("#fade")
const txtPalavra = document.getElementById('palavra');
const eventos = [abrirModal, fade, fecharModal]

function inserirPalavra() {
    let palavra = txtPalavra.value
    if (txtPalavra.value == "") {
        alert("Insira uma palavra!");
    } else {
        palavras.push({ nome: `${palavra}` });
    }
}

const toggleModal = () => {
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

eventos.map((el) => {
    el.addEventListener('click', () => toggleModal())
})