import axiosInstance from '@/services/axios/axios.config'

import { addPokemonId, formatPokemonDetails } from '../adapters/pokemonAdapters'

const getAllPokemons = async () => {
  let getPokemon = await axiosInstance.get('/pokemon?limit=200')

  let formattedPokemons = addPokemonId(getPokemon.data.results)

  return formattedPokemons
}

const getPokemonByName = async (name, favArr) => {
  let getPokemonDetails = await axiosInstance.get(`/pokemon/${name}?limit=200`)

  let formattedPokemon = formatPokemonDetails(getPokemonDetails.data, favArr)

  return formattedPokemon
}

export { getAllPokemons, getPokemonByName }
