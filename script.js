const cartasPadrao = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function obterDadosEstruturados() {
    const dadosSalvos = localStorage.getItem('painelPilotoDados');
    if (dadosSalvos) return JSON.parse(dadosSalvos);

    return {
        piloto: { lvl: '1', nome: 'Nome do Piloto' },
        roboAtual: { lvl: '1', def: '10', agi: '5', vid: '100', dano: '+2' },
        tabelaAtaques: cartasPadrao.map(c => ({ carta: c, ataque: '', dano: '', desc: '' })),
        versoesRobos: [{ modelo: 'Robô Mark I (V1)', def: '5', agi: '2', vid: '80', dano: '+1' }],
        kaijus: [{ nome: 'Leatherback', imagem: '/img/Kayjuporco.png', golpes: [] }],
        missoesTexto: '- Missão 1:\n- Missão 2:\n- Missão 3:'
    };
}

function salvarDados() {
    const dados = obterDadosEstruturados();

    if (document.getElementById('lvl-piloto')) {
        dados.piloto.lvl = document.getElementById('lvl-piloto').innerText;
        dados.piloto.nome = document.getElementById('nome-piloto').value;
        dados.roboAtual.lvl = document.getElementById('lvl-robo').innerText;
        dados.roboAtual.def = document.getElementById('def-robo').value;
        dados.roboAtual.agi = document.getElementById('agi-robo').value;
        dados.roboAtual.vid = document.getElementById('vid-robo').value;
        dados.roboAtual.dano = document.getElementById('dano-robo').value;

        dados.tabelaAtaques = [];
        cartasPadrao.forEach(carta => {
            dados.tabelaAtaques.push({
                carta: carta,
                ataque: document.getElementById(`atk-${carta}`).value,
                dano: document.getElementById(`dano-${carta}`).value,
                desc: document.getElementById(`desc-${carta}`).value
            });
        });
    }

    dados.versoesRobos = [];
    document.querySelectorAll('#container-versoes .card-versao-antiga').forEach(card => {
        dados.versoesRobos.push({
            modelo: card.querySelector('.input-titulo').value,
            def: card.querySelector('.def').value,
            agi: card.querySelector('.agi').value,
            vid: card.querySelector('.vid').value,
            dano: card.querySelector('.dano').value
        });
    });

    dados.kaijus = [];
    document.querySelectorAll('#container-kaijus .card-kaiju').forEach(card => {
        const golpesKaiju = [];
        cartasPadrao.forEach(carta => {
            golpesKaiju.push({
                carta: carta,
                ataque: card.querySelector(`.k-atk-${carta}`).value,
                dano: card.querySelector(`.k-dano-${carta}`).value,
                desc: card.querySelector(`.k-desc-${carta}`).value
            });
        });

        const urlImagem = card.querySelector('.img-kaiju').src;

        dados.kaijus.push({
            nome: card.querySelector('.input-titulo').value,
            imagem: urlImagem,
            golpes: golpesKaiju
        });
    });

    // Salva o texto puro dos tópicos do diário de missões
    const caixaMissoes = document.getElementById('caixa-missoes-texto');
    if (caixaMissoes) {
        dados.missoesTexto = caixaMissoes.value;
    }

    localStorage.setItem('painelPilotoDados', JSON.stringify(dados));
}

function carregarDados() {
    const dados = obterDadosEstruturados();

    if (document.getElementById('lvl-piloto')) {
        document.getElementById('lvl-piloto').innerText = dados.piloto.lvl;
        document.getElementById('nome-piloto').value = dados.piloto.nome;
        document.getElementById('lvl-robo').innerText = dados.roboAtual.lvl;
        document.getElementById('def-robo').value = dados.roboAtual.def;
        document.getElementById('agi-robo').value = dados.roboAtual.agi;
        document.getElementById('vid-robo').value = dados.roboAtual.vid;
        document.getElementById('dano-robo').value = dados.roboAtual.dano;

        const tbody = document.getElementById('corpo-tabela');
        if (tbody) {
            tbody.innerHTML = '';
            dados.tabelaAtaques.forEach(item => {
                tbody.innerHTML += `<tr>
                    <td><strong>${item.carta}</strong></td>
                    <td><input type="text" id="atk-${item.carta}" value="${item.ataque}" oninput="salvarDados()"></td>
                    <td><input type="text" id="dano-${item.carta}" value="${item.dano}" oninput="salvarDados()"></td>
                    <td><input type="text" id="desc-${item.carta}" value="${item.desc}" oninput="salvarDados()"></td>
                </tr>`;
            });
        }
    }

    const containerVersoes = document.getElementById('container-versoes');
    if (containerVersoes) {
        containerVersoes.innerHTML = '';
        dados.versoesRobos.forEach(r => adicionarCardRobo(r.modelo, r.def, r.agi, r.vid, r.dano));
    }

    const containerKaijus = document.getElementById('container-kaijus');
    if (containerKaijus) {
        containerKaijus.innerHTML = '';
        dados.kaijus.forEach(k => adicionarCardKaiju(k.nome, k.golpes, k.imagem));
    }

    // Carrega o texto puro dos tópicos no textarea
    const caixaMissoes = document.getElementById('caixa-missoes-texto');
    if (caixaMissoes) {
        caixaMissoes.value = dados.missoesTexto || '';
    }
}

function adicionarCardRobo(modelo = '', def = '', agi = '', vid = '', dano = '') {
    const container = document.getElementById('container-versoes');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'card card-versao-antiga';
    div.innerHTML = `
        <input type="text" class="input-titulo" value="${modelo || 'Novo Modelo'}" oninput="salvarDados()">
        <div class="container-foto"><img src="/img/robo.png" alt="Robô"></div>
        <div class="info">
            <label>Defesa: <input type="text" class="def" value="${def}" oninput="salvarDados()"></label>
            <label>Agilidade: <input type="text" class="agi" value="${agi}" oninput="salvarDados()"></label>
            <label>Vida: <input type="text" class="vid" value="${vid}" oninput="salvarDados()"></label>
            <label>Dano Extra: <input type="text" class="dano" value="${dano}" oninput="salvarDados()"></label>
            <label>Nivel: <input type="text" class="dano" value="${dano}" oninput="salvarDados()"></label>
        </div>
        <button class="btn-deletar" onclick="removerItem(this)">Remover Versão</button>`;
    container.appendChild(div);
    salvarDados();
}

function adicionarCardKaiju(nome = '', golpesExistentes = [], imagemSalva = '') {
    const container = document.getElementById('container-kaijus');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'card card-kaiju';

    const fotoKaiju = imagemSalva || '/img/Kayjuporco.png';

    let htmlInterno = `
        <input type="text" class="input-titulo" value="${nome || 'Nome do Kaiju'}" oninput="salvarDados()">
        
        <div class="container-foto" style="cursor: pointer;" title="Clique para mudar a foto" onclick="mudarFotoKaiju(this)">
            <img src="${fotoKaiju}" class="img-kaiju" alt="Kaiju">
        </div>

        <div class="ataques-kaiju">
            <h3>Tabela de Golpes</h3>
            <div class="tabela-container-scroll">
                <table class="tabela-ataques tabela-kaiju">
                    <thead><tr><th>Carta</th><th>Ataque</th><th>Dano</th><th>Descrição</th></tr></thead>
                    <tbody>`;

    cartasPadrao.forEach(carta => {
        const golpeSalvo = golpesExistentes ? golpesExistentes.find(g => g.carta === carta) : null;
        htmlInterno += `
            <tr>
                <td><strong>${carta}</strong></td>
                <td><input type="text" class="k-atk-${carta}" value="${golpeSalvo ? golpeSalvo.ataque : ''}" oninput="salvarDados()"></td>
                <td><input type="text" class="k-dano-${carta}" value="${golpeSalvo ? golpeSalvo.dano : ''}" oninput="salvarDados()"></td>
                <td><input type="text" class="k-desc-${carta}" value="${golpeSalvo ? golpeSalvo.desc : ''}" oninput="salvarDados()"></td>
            </tr>`;
    });

    htmlInterno += `</tbody></table></div></div>
        <button class="btn-deletar" onclick="removerItem(this)">Remover Registro</button>`;

    div.innerHTML = htmlInterno;
    container.appendChild(div);
    salvarDados();
}

function adicionarCardMissao() {
    const caixaMissoes = document.getElementById('caixa-missoes-texto');
    if (!caixaMissoes) return;

    caixaMissoes.focus();
    
    // Adiciona uma nova linha com tópico caso o campo já tenha conteúdo
    if (caixaMissoes.value.trim() !== '') {
        if (!caixaMissoes.value.endsWith('\n')) {
            caixaMissoes.value += '\n';
        }
        caixaMissoes.value += '- ';
    } else {
        caixaMissoes.value = '- ';
    }
    
    salvarDados();
}

function removerItem(btn) {
    const cardAlvo = btn.closest('.card');
    if (cardAlvo) {
        cardAlvo.remove();
        salvarDados();
    }
}

function mudarFotoKaiju(containerFoto) {
    const novoCaminho = prompt("Digite o caminho da nova imagem local (ex: img/kaiju2.png) ou link da internet:");
    if (novoCaminho) {
        const imagem = containerFoto.querySelector('.img-kaiju');
        imagem.src = novoCaminho;
        salvarDados();
    }
}

window.onload = carregarDados;
