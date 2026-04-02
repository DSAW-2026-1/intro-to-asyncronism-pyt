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

    const tipos = pokemon.types.map(t => t.type.name).join(", ");
    const habilidades = pokemon.abilities.map(a => a.ability.name).join(", ");

    resultado.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Tipo:</strong> ${tipos}</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
        <img src="${pokemon.sprites.front_default}">
    `;
}
