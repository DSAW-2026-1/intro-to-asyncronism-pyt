const boton = document.getElementById("btnBuscar");

boton.addEventListener("click", buscarPokemon);

// 🔍 Buscar Pokémon
async function buscarPokemon() {
    const nombre = document.getElementById("pokemonInput").value.toLowerCase();

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        if (!respuesta.ok) {
            throw new Error("No encontrado");
        }

        const data = await respuesta.json();
        const descripcion = await obtenerDescripcion(nombre);

        mostrarPokemon(data, descripcion);

    } catch (error) {
        document.getElementById("resultado").innerHTML = `
            <p style="color:red;">Pokémon not found ❌</p>
        `;
    }
}

// 🎲 Pokémon aleatorio
async function pokemonRandom() {
    const random = Math.floor(Math.random() * 151) + 1;

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
    const data = await respuesta.json();

    const descripcion = await obtenerDescripcion(data.name);

    mostrarPokemon(data, descripcion);
}

// 📖 Obtener descripción (NUEVO ENDPOINT)
async function obtenerDescripcion(nombre) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombre}`);
    const data = await res.json();

    const entry = data.flavor_text_entries.find(
        e => e.language.name === "en"
    );

    return entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available";
}

// 🧾 Mostrar datos
function mostrarPokemon(pokemon, descripcion) {
    const resultado = document.getElementById("resultado");

    const types = pokemon.types.map(t => t.type.name).join(", ");
    const mainType = pokemon.types[0].type.name;

    const abilities = pokemon.abilities.map(a => a.ability.name).join(", ");

    resultado.className = mainType; // 🎨 color dinámico

    resultado.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.other['dream_world'].front_default || pokemon.sprites.front_default}">
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
        <p><strong>Description:</strong> ${descripcion}</p>
    `;
}

// ⌨️ Buscar con Enter
document.getElementById("pokemonInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        buscarPokemon();
    }
});
