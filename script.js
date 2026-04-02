const boton = document.getElementById("btnBuscar");

boton.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
    const nombre = document.getElementById("pokemonInput").value.toLowerCase();

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        if (!respuesta.ok) {
            throw new Error("No encontrado");
        }

        const data = await respuesta.json();
        mostrarPokemon(data);

    } catch (error) {
        document.getElementById("resultado").innerHTML = `
            <p style="color: red;">Pokémon not found ❌</p>
        `;
    }
}

async function pokemonRandom() {
    const random = Math.floor(Math.random() * 151) + 1;

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
    const data = await respuesta.json();

    mostrarPokemon(data);
}

function mostrarPokemon(pokemon) {
    const resultado = document.getElementById("resultado");

    const types = pokemon.types.map(t => t.type.name).join(", ");
    const abilities = pokemon.abilities.map(a => a.ability.name).join(", ");

    resultado.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
    `;
}

document.getElementById("pokemonInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        buscarPokemon();
    }
});
