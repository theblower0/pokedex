
const url = 'https://pokeapi.co/api/v2/pokemon';

const fetchPokemonName = async (name) => {

    try {
        const resp = await fetch(`${url}/${name}`);

        if (!resp.ok) alert('No se pudo encontrar ese pokemon');
        const data = resp.json();
        return data;
    } catch (err) {
        throw err;
    }

};

const fetchPokemonRandom = async (id) => {
    const resp = await fetch(`${url}/${id}`);
    const data = await resp.json();

    return data;
};

const randomNumber = () => {
    const num = Math.random();
    const random = Math.floor(num * 899) + 1;
    return random;
};



const screenData = document.getElementById('screen-data');
const bars = document.getElementById('bars');


const randomButton = document.getElementById("randomButton");
const changeButton = document.getElementById("changeButton");

const pokeName = document.getElementById("pokeName");
let pokeInput;
let tbody;

const createPokemonChart = () => {
    const html = `
    <div class="data-title">
    <p>HP</p>
    <p>ATK</p>
    <p>DEF</p>
    <p>SA</p>
    <p>SD</p>
    <p>SPD</p>
    </div> 
    `;
    screenData.innerHTML += html;
}

const createBars = (stats) => {

    // const widthBar = stats.base_stat > 100 ? (stats.base_stat * 0.3) : (stats.base_stat * 0.5);
    const widthBar = stats.base_stat <= 150 ? stats.base_stat * 0.4 : stats.base_stat * 0.3;

    const html = `
        <div class="bar-fill" id="${stats.stat.name}" style="width: ${widthBar}%;">
            <div class="bar-text">${stats.base_stat}</div>
        </div>
        
        `;

    const bar = document.createElement('div');
    bar.setAttribute('class', 'bar');
    bar.innerHTML = html;

    bars.appendChild(bar);
    screenData.appendChild(bars);

};

const createTable = () => {
    const html = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Type</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
    screenData.innerHTML += html;
    tbody = document.querySelector('tbody');

};

const createTypes = (types) => {
    const html = `
    <td scope="col">${types.type.name}</td>
    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody.appendChild(tr);
};

const setImage = (img) => {
    const pokeImage = document.getElementById("pokeImage");
    pokeImage.src = img;
    pokeImage.setAttribute("style", "height: 120px");
}



randomButton.addEventListener('click', async (event) => {

    const data = await fetchPokemonRandom(randomNumber());
    pokeName.value = data.name;
    displayInfo(data);

});

const displayInfo = (data) => {
    if (screenData.hasChildNodes()) {
        screenData.innerHTML = "";
        bars.innerHTML = "";
    }
    const stats = data.stats;
    const image = data.sprites.front_default;
    const types = data.types;

    createPokemonChart();
    stats.forEach(createBars);
    createTable();
    types.forEach(createTypes);

    setImage(image);

};


pokeName.addEventListener('keyup', async (event) => {
    pokeInput = pokeName.value.toLowerCase();

    if (event.key === 'Enter') {
        const data = await fetchPokemonName(pokeInput);
        displayInfo(data);
        console.log(randomButton);


    }
});