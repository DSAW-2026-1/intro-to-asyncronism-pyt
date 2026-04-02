const boton = document.getElementById("btnBuscar");

boton.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
    const nombre = document.getElementById("pokemonInput").value.toLowerCase();

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const data = await respuesta.json();

        mostrarPokemon(data);

    } catch (error) {
        alert("Pokémon no encontrado ❌");
    }
}

function mostrarPokemon(pokemon) {
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Peso: ${pokemon.weight}</p>
        <img src="${pokemon.sprites.front_default}">
    `;
}
