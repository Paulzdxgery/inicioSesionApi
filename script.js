// Datos quemados
const USER_DATA = { user: "admin", pass: "1234" };

// Referencias al DOM
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const mainContent = document.getElementById('main-content');
const logoutBtn = document.getElementById('logout-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// 1. Manejo de Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === USER_DATA.user && pass === USER_DATA.pass) {
        loginContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
    } else {
        alert("Credenciales incorrectas");
    }
});

// 2. Cerrar Sesión
logoutBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    resultsGrid.innerHTML = ''; // Limpiar resultados
});

// 3. Consumo de API (Rick and Morty)
async function searchCharacters() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
        const data = await response.json();

        if (data.results) {
            renderCards(data.results);
        } else {
            resultsGrid.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error("Error buscando:", error);
    }
}

function renderCards(characters) {
    resultsGrid.innerHTML = ''; // Limpiar previo
    
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <h3>Nombre: ${char.name}</h3>
            <p>ID: #${char.id}</p>
            <p>Especie: ${char.species}</p>
        `;
        resultsGrid.appendChild(card);
    });
}

// Eventos de búsqueda
searchBtn.addEventListener('click', searchCharacters);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCharacters();
});