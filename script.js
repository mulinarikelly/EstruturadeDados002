class Fila {
    constructor() {
        this.itens = [];
    }

    enqueue(personagem) {
        this.itens.push(personagem);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.itens.shift();
    }

    isEmpty() {
        return this.itens.length === 0;
    }
}

const minhaFila = new Fila();

const traducoes = {
    "Human": "Humano",
    "Alien": "Alienígena",
    "Alive": "Vivo",
    "Dead": "Morto",
    "unknown": "Desconhecido",
    "Humanoid": "Humanoide",
    "Poopybutthole": "Poopybutthole",
    "Mythological Creature": "Criatura Mitológica",
    "Animal": "Animal",
    "Robot": "Robô",
    "Cronenberg": "Cronenberg",
    "Disease": "Doença"
};

async function buscarPersonagem() {
    const id = Math.floor(Math.random() * 826) + 1;
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        minhaFila.enqueue(data);
        renderizar();
    } catch (e) {
        console.error(e);
    }
}

function atender() {
    const p = minhaFila.dequeue();
    const display = document.getElementById('cardAtual');
    const buzina = document.getElementById('somBuzina');

    if (p) {
        if (buzina) {
            buzina.currentTime = 0;
            buzina.play().catch(() => {});
        }

        const especieTraduzida = traducoes[p.species] || p.species;
        const statusTraduzido = traducoes[p.status] || p.status;

        display.innerHTML = `
            <img src="${p.image}" width="150" style="border-radius: 8px;"><br>
            <h3>${p.name}</h3>
            <p><strong>Espécie:</strong> ${especieTraduzida}</p>
            <p><strong>Status:</strong> ${statusTraduzido}</p>
        `;
    } else {
        display.innerHTML = "Fila Vazia!";
    }
    renderizar();
}

function renderizar() {
    const container = document.getElementById('containerFila');
    container.innerHTML = "";

    minhaFila.itens.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card-fila';
        div.innerHTML = `<img src="${p.image}" width="50"><p>${p.name}</p>`;
        container.appendChild(div);
    });
}

document.getElementById('btnAdicionar').addEventListener('click', buscarPersonagem);
document.getElementById('btnAtender').addEventListener('click', atender);
