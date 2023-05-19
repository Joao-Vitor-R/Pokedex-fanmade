const pokeContainer = document.querySelector("#pokeContainer")
const pokemonCount = 1010
const colors = {
    bug: '#81b347',
    dragon: '#97b3e6',
    fairy: '#fceaff',
    fire: '#ee6d6d',
    ghost:'#63348d',
    ground: '#bf6308',
    normal: '#F5F5F5',
    psychic: '#f782f7',
    steel: '#d8d7cb',
    dark:'#545454',
    electric: '#fefc2f',
    fighting: '#E6E0D4',
    flying: '#c1dbf0',
    grass: '#DEFDE0',
    ice: '#89e5e6',
    poison: '#c391d4',
    rock: '#d5d5d4',
    water: '#3a6fbe',
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () =>{
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) =>{
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
        <div class="imgContainer">
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
		</div>
		<div class="info">
			<span class="number">#${id}</span>
			<h3 class="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
		</div>
    `

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
}

fetchPokemons()