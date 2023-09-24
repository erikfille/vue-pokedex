const addPokemonId = (pokemons) => {
  pokemons.forEach((p) => {
    let urlId = p.url.split('/')
    p.id = Number(urlId[urlId.length - 2])
    p.name = p.name[0].toUpperCase() + p.name.slice(1)
  })
  return pokemons
}

export { addPokemonId }
