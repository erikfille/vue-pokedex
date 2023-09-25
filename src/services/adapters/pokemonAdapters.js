const addPokemonId = (pokemons) => {
  pokemons.forEach((p) => {
    let urlId = p.url.split('/')
    p.id = Number(urlId[urlId.length - 2])
    p.name = p.name[0].toUpperCase() + p.name.slice(1)
  })
  return pokemons
}

const formatPokemonDetails = (pokemon, favArr) => {
  let formattedPokemon = {
    id: pokemon.id,
    image: pokemon.sprites.other['official-artwork'].front_default,
    name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
    weight: pokemon.weight,
    height: pokemon.height,
    types: pokemon.types.map((t) => t.type.name[0].toUpperCase() + t.type.name.slice(1)).join(', ')
  }

  if (favArr.length > 0 && favArr.includes(formattedPokemon.id)) {
    formattedPokemon.isFavorite = true
  } else formattedPokemon.isFavorite = false

  return formattedPokemon
}

export { addPokemonId, formatPokemonDetails }
