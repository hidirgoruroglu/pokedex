const container = document.querySelector(".container");
const form = document.querySelector(".poke-search");
const input = document.querySelector("#poke-input");

const pokeCount = 151;

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};


const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    createPokemonBox(data);
} 

const createPokemonBox = async (data) => {
    const id = data.id.toString().padStart(3,"0");
    let smallType = data.types[0].type.name;
    let type = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
    const color = colors[smallType];
    const html = `
    <div class="poke-box" style="background-color: ${color};">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" class="poke-img" alt="${data.name}">
    <h4 class="poke-name">${data.name}</h4>
    <p class="poke-id">#${id}</p>
    <p class="poke-type">${type}</p>
    <p class="poke-weight">${data.weight}kg</p>
    </div>`;

    container.innerHTML += html;


}


form.addEventListener("input", function(e) {
    const pokemons = document.querySelectorAll(".poke-name");
    const search = input.value.toLowerCase();
    pokemons.forEach(poke => {
        poke.parentElement.style.display = "block";
        if (!poke.innerHTML.toLowerCase().includes(search)) {
            poke.parentElement.style.display = "none";
        }
    });
});


initPokemon();