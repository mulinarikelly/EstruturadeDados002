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

    if (p) {
        display.innerHTML = `
            <img src="${p.image}" width="150"><br>
            <h3>${p.name}</h3>
            <p>Espécie: ${p.species}</p>
            <p>Status: ${p.status}</p>
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
        div.innerHTML = `<img src="${p.image}"><p>${p.name}</p>`;
        container.appendChild(div);
    });
}

document.getElementById('btnAdicionar').addEventListener('click', buscarPersonagem);
document.getElementById('btnAtender').addEventListener('click', atender);
