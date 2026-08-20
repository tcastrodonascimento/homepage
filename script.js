// ======================================================
// CONFIGURAÇÕES
// ======================================================

const cartasPadrao = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
];

const CHAVE_STORAGE = 'painelPilotoDados';


// ======================================================
// DADOS PADRÃO
// ======================================================

function criarDadosPadrao() {

    return {

        piloto: {
            lvl: '1',
            nome: 'Nome do Piloto'
        },


        roboAtual: {

            lvl: '1',

            def: '10',

            agi: '5',

            vid: '100',

            dano: '+2'

        },


        tabelaAtaques:

            cartasPadrao.map(carta => ({

                carta: carta,

                ataque: '',

                dano: '',

                desc: ''

            })),


        versoesRobos: [

            {

                modelo: 'Robô Mark I (V1)',

                lvl: '1',

                def: '5',

                agi: '2',

                vid: '80',

                dano: '+1'

            }

        ],


        kaijus: [

            {

                nome: 'Leatherback',

                imagem: '/img/Kayjuporco.png',

                golpes: []

            }

        ],


        missoesTexto:
            '- Missão 1:\n- Missão 2:\n- Missão 3:'

    };

}


// ======================================================
// OBTER DADOS SALVOS
// ======================================================

function obterDadosEstruturados() {

    const dadosSalvos =
        localStorage.getItem(CHAVE_STORAGE);


    // Se não existe nada salvo,
    // cria os dados iniciais.

    if (!dadosSalvos) {

        const dadosNovos =
            criarDadosPadrao();

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(dadosNovos)
        );

        return dadosNovos;

    }


    try {

        const dados =
            JSON.parse(dadosSalvos);


        // Compatibilidade com versões antigas

        if (!dados.piloto) {

            dados.piloto = {
                lvl: '1',
                nome: 'Nome do Piloto'
            };

        }


        if (!dados.roboAtual) {

            dados.roboAtual = {
                lvl: '1',
                def: '10',
                agi: '5',
                vid: '100',
                dano: '+2'
            };

        }


        if (dados.roboAtual.lvl === undefined) {

            dados.roboAtual.lvl = '1';

        }


        if (!Array.isArray(dados.tabelaAtaques)) {

            dados.tabelaAtaques =
                cartasPadrao.map(carta => ({

                    carta: carta,

                    ataque: '',

                    dano: '',

                    desc: ''

                }));

        }


        if (!Array.isArray(dados.versoesRobos)) {

            dados.versoesRobos = [];

        }


        // Garante que cada robô tenha
        // seu próprio nível.

        dados.versoesRobos =
            dados.versoesRobos.map(robo => ({

                modelo:
                    robo.modelo || 'Novo Modelo',

                lvl:
                    robo.lvl || '1',

                def:
                    robo.def || '',

                agi:
                    robo.agi || '',

                vid:
                    robo.vid || '',

                dano:
                    robo.dano || ''

            }));


        if (!Array.isArray(dados.kaijus)) {

            dados.kaijus = [];

        }


        if (dados.missoesTexto === undefined) {

            dados.missoesTexto = '';

        }


        return dados;

    } catch (erro) {

        console.error(
            'Erro ao ler dados salvos:',
            erro
        );


        return criarDadosPadrao();

    }

}


// ======================================================
// SALVAR DADOS
// ======================================================

function salvarDados() {

    const dados =
        obterDadosEstruturados();


    // ==================================================
    // PILOTO
    // ==================================================

    const nivelPiloto =
        document.getElementById('lvl-piloto');

    const nomePiloto =
        document.getElementById('nome-piloto');


    if (nivelPiloto) {

        dados.piloto.lvl =
            nivelPiloto.innerText.trim();

    }


    if (nomePiloto) {

        dados.piloto.nome =
            nomePiloto.value;

    }


    // ==================================================
    // ROBÔ ATUAL
    // ==================================================

    const nivelRobo =
        document.getElementById('lvl-robo');

    const nivelRoboCampo =
        document.getElementById('nivel-robo');

    const defesaRobo =
        document.getElementById('def-robo');

    const agilidadeRobo =
        document.getElementById('agi-robo');

    const vidaRobo =
        document.getElementById('vid-robo');

    const danoRobo =
        document.getElementById('dano-robo');


    if (nivelRobo) {

        dados.roboAtual.lvl =
            nivelRobo.innerText.trim();

    }


    // Campo de nível separado

    if (nivelRoboCampo) {

        dados.roboAtual.lvl =
            nivelRoboCampo.value;

    }


    if (defesaRobo) {

        dados.roboAtual.def =
            defesaRobo.value;

    }


    if (agilidadeRobo) {

        dados.roboAtual.agi =
            agilidadeRobo.value;

    }


    if (vidaRobo) {

        dados.roboAtual.vid =
            vidaRobo.value;

    }


    if (danoRobo) {

        dados.roboAtual.dano =
            danoRobo.value;

    }


    // ==================================================
    // ATAQUES DO ROBÔ
    // ==================================================

    dados.tabelaAtaques = [];


    cartasPadrao.forEach(carta => {

        const ataque =
            document.getElementById(
                `atk-${carta}`
            );

        const dano =
            document.getElementById(
                `dano-${carta}`
            );

        const desc =
            document.getElementById(
                `desc-${carta}`
            );


        dados.tabelaAtaques.push({

            carta: carta,

            ataque:
                ataque ? ataque.value : '',

            dano:
                dano ? dano.value : '',

            desc:
                desc ? desc.value : ''

        });

    });


    // ==================================================
    // VERSÕES DOS ROBÔS
    // ==================================================

    dados.versoesRobos = [];


    document
        .querySelectorAll(
            '#container-versoes .card-versao-antiga'
        )
        .forEach(card => {


            const titulo =
                card.querySelector(
                    '.input-titulo'
                );

            const nivel =
                card.querySelector(
                    '.lvl'
                );

            const defesa =
                card.querySelector(
                    '.def'
                );

            const agilidade =
                card.querySelector(
                    '.agi'
                );

            const vida =
                card.querySelector(
                    '.vid'
                );

            const dano =
                card.querySelector(
                    '.dano'
                );


            dados.versoesRobos.push({

                modelo:
                    titulo ? titulo.value : '',

                lvl:
                    nivel ? nivel.value : '1',

                def:
                    defesa ? defesa.value : '',

                agi:
                    agilidade ? agilidade.value : '',

                vid:
                    vida ? vida.value : '',

                dano:
                    dano ? dano.value : ''

            });

        });


    // ==================================================
    // KAIJUS
    // ==================================================

    dados.kaijus = [];


    document
        .querySelectorAll(
            '#container-kaijus .card-kaiju'
        )
        .forEach(card => {


            const titulo =
                card.querySelector(
                    '.input-titulo'
                );

            const imagem =
                card.querySelector(
                    '.img-kaiju'
                );


            const golpes = [];


            cartasPadrao.forEach(carta => {


                const ataque =
                    card.querySelector(
                        `.k-atk-${carta}`
                    );

                const dano =
                    card.querySelector(
                        `.k-dano-${carta}`
                    );

                const desc =
                    card.querySelector(
                        `.k-desc-${carta}`
                    );


                golpes.push({

                    carta: carta,

                    ataque:
                        ataque ? ataque.value : '',

                    dano:
                        dano ? dano.value : '',

                    desc:
                        desc ? desc.value : ''

                });

            });


            dados.kaijus.push({

                nome:
                    titulo ? titulo.value : '',

                imagem:
                    imagem ? imagem.src : '',

                golpes:
                    golpes

            });

        });


    // ==================================================
    // MISSÕES
    // ==================================================

    const caixaMissoes =
        document.getElementById(
            'caixa-missoes-texto'
        );


    if (caixaMissoes) {

        dados.missoesTexto =
            caixaMissoes.value;

    }


    // ==================================================
    // SALVAR TUDO
    // ==================================================

    try {

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(dados)
        );

    } catch (erro) {

        console.error(
            'Não foi possível salvar os dados:',
            erro
        );

    }

}


// ======================================================
// CARREGAR DADOS
// ======================================================

function carregarDados() {

    const dados =
        obterDadosEstruturados();


    // ==================================================
    // PILOTO
    // ==================================================

    const nivelPiloto =
        document.getElementById('lvl-piloto');

    const nomePiloto =
        document.getElementById('nome-piloto');


    if (nivelPiloto) {

        nivelPiloto.innerText =
            dados.piloto.lvl || '1';

    }


    if (nomePiloto) {

        nomePiloto.value =
            dados.piloto.nome || '';

    }


    // ==================================================
    // ROBÔ ATUAL
    // ==================================================

    const nivelRobo =
        document.getElementById('lvl-robo');

    const nivelRoboCampo =
        document.getElementById('nivel-robo');

    const defesaRobo =
        document.getElementById('def-robo');

    const agilidadeRobo =
        document.getElementById('agi-robo');

    const vidaRobo =
        document.getElementById('vid-robo');

    const danoRobo =
        document.getElementById('dano-robo');


    if (nivelRobo) {

        nivelRobo.innerText =
            dados.roboAtual.lvl || '1';

    }


    if (nivelRoboCampo) {

        nivelRoboCampo.value =
            dados.roboAtual.lvl || '1';

    }


    if (defesaRobo) {

        defesaRobo.value =
            dados.roboAtual.def || '';

    }


    if (agilidadeRobo) {

        agilidadeRobo.value =
            dados.roboAtual.agi || '';

    }


    if (vidaRobo) {

        vidaRobo.value =
            dados.roboAtual.vid || '';

    }


    if (danoRobo) {

        danoRobo.value =
            dados.roboAtual.dano || '';

    }


    // ==================================================
    // ATAQUES
    // ==================================================

    const tbody =
        document.getElementById(
            'corpo-tabela'
        );


    if (tbody) {

        tbody.innerHTML = '';


        cartasPadrao.forEach(carta => {


            const salvo =
                dados.tabelaAtaques.find(
                    item =>
                        item.carta === carta
                );


            tbody.innerHTML += `

                <tr>

                    <td>
                        <strong>${carta}</strong>
                    </td>

                    <td>

                        <input
                            type="text"
                            id="atk-${carta}"
                            value="${salvo ? escaparHTML(salvo.ataque) : ''}"
                            oninput="salvarDados()"
                        >

                    </td>

                    <td>

                        <input
                            type="text"
                            id="dano-${carta}"
                            value="${salvo ? escaparHTML(salvo.dano) : ''}"
                            oninput="salvarDados()"
                        >

                    </td>

                    <td>

                        <input
                            type="text"
                            id="desc-${carta}"
                            value="${salvo ? escaparHTML(salvo.desc) : ''}"
                            oninput="salvarDados()"
                        >

                    </td>

                </tr>

            `;

        });

    }


    // ==================================================
    // VERSÕES DOS ROBÔS
    // ==================================================

    const containerVersoes =
        document.getElementById(
            'container-versoes'
        );


    if (containerVersoes) {

        containerVersoes.innerHTML = '';


        dados.versoesRobos.forEach(robo => {

            criarCardRobo(
                containerVersoes,
                robo.modelo,
                robo.lvl,
                robo.def,
                robo.agi,
                robo.vid,
                robo.dano
            );

        });

    }


    // ==================================================
    // KAIJUS
    // ==================================================

    const containerKaijus =
        document.getElementById(
            'container-kaijus'
        );


    if (containerKaijus) {

        containerKaijus.innerHTML = '';


        dados.kaijus.forEach(kaiju => {

            criarCardKaiju(
                containerKaijus,
                kaiju.nome,
                kaiju.golpes,
                kaiju.imagem
            );

        });

    }


    // ==================================================
    // MISSÕES
    // ==================================================

    const caixaMissoes =
        document.getElementById(
            'caixa-missoes-texto'
        );


    if (caixaMissoes) {

        caixaMissoes.value =
            dados.missoesTexto || '';

    }

}


// ======================================================
// ESCAPAR HTML
// ======================================================

function escaparHTML(valor) {

    if (valor === null ||
        valor === undefined) {

        return '';

    }


    return String(valor)

        .replace(/&/g, '&amp;')

        .replace(/</g, '&lt;')

        .replace(/>/g, '&gt;')

        .replace(/"/g, '&quot;')

        .replace(/'/g, '&#039;');

}


// ======================================================
// CRIAR CARD DE ROBÔ
// ======================================================

function criarCardRobo(
    container,
    modelo = '',
    lvl = '1',
    def = '',
    agi = '',
    vid = '',
    dano = ''
) {


    const div =
        document.createElement('div');


    div.className =
        'card card-versao-antiga';


    div.innerHTML = `

        <input
            type="text"
            class="input-titulo"
            value="${escaparHTML(modelo || 'Novo Modelo')}"
            oninput="salvarDados()"
        >


        <div class="container-foto">

            <img
                src="/img/robo.png"
                alt="Robô"
            >

        </div>


        <div class="info">


            <label>
                Nível:

                <input
                    type="text"
                    class="lvl"
                    value="${escaparHTML(lvl || '1')}"
                    oninput="salvarDados()"
                >

            </label>


            <label>
                Defesa:

                <input
                    type="text"
                    class="def"
                    value="${escaparHTML(def)}"
                    oninput="salvarDados()"
                >

            </label>


            <label>
                Agilidade:

                <input
                    type="text"
                    class="agi"
                    value="${escaparHTML(agi)}"
                    oninput="salvarDados()"
                >

            </label>


            <label>
                Vida:

                <input
                    type="text"
                    class="vid"
                    value="${escaparHTML(vid)}"
                    oninput="salvarDados()"
                >

            </label>


            <label>
                Dano Extra:

                <input
                    type="text"
                    class="dano"
                    value="${escaparHTML(dano)}"
                    oninput="salvarDados()"
                >

            </label>


        </div>


        <button
            class="btn-deletar"
            onclick="removerItem(this)"
        >
            Remover Versão
        </button>

    `;


    container.appendChild(div);

}


// ======================================================
// ADICIONAR ROBÔ
// ======================================================

function adicionarCardRobo(
    modelo = 'Novo Modelo',
    lvl = '1',
    def = '',
    agi = '',
    vid = '',
    dano = ''
) {


    const container =
        document.getElementById(
            'container-versoes'
        );


    if (!container) return;


    criarCardRobo(
        container,
        modelo,
        lvl,
        def,
        agi,
        vid,
        dano
    );


    salvarDados();

}


// ======================================================
// CRIAR CARD DE KAIJU
// ======================================================

function criarCardKaiju(
    container,
    nome = '',
    golpesExistentes = [],
    imagemSalva = ''
) {


    const div =
        document.createElement('div');


    div.className =
        'card card-kaiju';


    const fotoKaiju =
        imagemSalva ||
        '/img/Kayjuporco.png';


    let htmlInterno = `

        <input
            type="text"
            class="input-titulo"
            value="${escaparHTML(nome || 'Nome do Kaiju')}"
            oninput="salvarDados()"
        >


        <div
            class="container-foto"
            style="cursor: pointer;"
            title="Clique para mudar a foto"
            onclick="mudarFotoKaiju(this)"
        >

            <img
                src="${escaparHTML(fotoKaiju)}"
                class="img-kaiju"
                alt="Kaiju"
            >

        </div>


        <div class="ataques-kaiju">

            <h3>
                Tabela de Golpes
            </h3>


            <div class="tabela-container-scroll">

                <table class="tabela-ataques tabela-kaiju">

                    <thead>

                        <tr>

                            <th>Carta</th>

                            <th>Ataque</th>

                            <th>Dano</th>

                            <th>Descrição</th>

                        </tr>

                    </thead>


                    <tbody>

    `;


    cartasPadrao.forEach(carta => {


        const golpeSalvo =
            golpesExistentes
                ? golpesExistentes.find(
                    golpe =>
                        golpe.carta === carta
                )
                : null;


        htmlInterno += `

            <tr>

                <td>
                    <strong>${carta}</strong>
                </td>


                <td>

                    <input
                        type="text"
                        class="k-atk-${carta}"
                        value="${golpeSalvo ? escaparHTML(golpeSalvo.ataque) : ''}"
                        oninput="salvarDados()"
                    >

                </td>


                <td>

                    <input
                        type="text"
                        class="k-dano-${carta}"
                        value="${golpeSalvo ? escaparHTML(golpeSalvo.dano) : ''}"
                        oninput="salvarDados()"
                    >

                </td>


                <td>

                    <input
                        type="text"
                        class="k-desc-${carta}"
                        value="${golpeSalvo ? escaparHTML(golpeSalvo.desc) : ''}"
                        oninput="salvarDados()"
                    >

                </td>

            </tr>

        `;

    });


    htmlInterno += `

                    </tbody>

                </table>

            </div>

        </div>


        <button
            class="btn-deletar"
            onclick="removerItem(this)"
        >
            Remover Registro
        </button>

    `;


    div.innerHTML =
        htmlInterno;


    container.appendChild(div);

}


// ======================================================
// ADICIONAR KAIJU
// ======================================================

function adicionarCardKaiju(
    nome = 'Nome do Kaiju',
    golpesExistentes = [],
    imagemSalva = ''
) {


    const container =
        document.getElementById(
            'container-kaijus'
        );


    if (!container) return;


    criarCardKaiju(
        container,
        nome,
        golpesExistentes,
        imagemSalva
    );


    salvarDados();

}


// ======================================================
// ADICIONAR MISSÃO
// ======================================================

function adicionarCardMissao() {


    const caixaMissoes =
        document.getElementById(
            'caixa-missoes-texto'
        );


    if (!caixaMissoes) return;


    caixaMissoes.focus();


    if (
        caixaMissoes.value.trim() !== ''
    ) {


        if (
            !caixaMissoes.value.endsWith('\n')
        ) {

            caixaMissoes.value += '\n';

        }


        caixaMissoes.value += '- ';


    } else {

        caixaMissoes.value = '- ';

    }


    salvarDados();

}


// ======================================================
// REMOVER ITEM
// ======================================================

function removerItem(btn) {


    const cardAlvo =
        btn.closest('.card');


    if (!cardAlvo) return;


    cardAlvo.remove();


    salvarDados();

}


// ======================================================
// MUDAR FOTO DO KAIJU
// ======================================================

function mudarFotoKaiju(containerFoto) {


    const novoCaminho =
        prompt(
            'Digite o caminho da nova imagem local (ex: img/kaiju2.png) ou link da internet:'
        );


    if (!novoCaminho) return;


    const imagem =
        containerFoto.querySelector(
            '.img-kaiju'
        );


    if (!imagem) return;


    imagem.src =
        novoCaminho;


    salvarDados();

}


// ======================================================
// SALVAR ANTES DE FECHAR / RECARREGAR
// ======================================================

window.addEventListener(
    'beforeunload',
    function () {

        salvarDados();

    }
);


// ======================================================
// INICIAR SITE
// ======================================================

window.addEventListener(
    'DOMContentLoaded',
    function () {

        carregarDados();

    }
);