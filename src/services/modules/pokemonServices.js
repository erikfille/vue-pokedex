import axiosInstance from '@/services/axios/axios.config'

import { addPokemonId } from '../adapters/pokemonAdapters'

const getAllPokemons = async () => {
  let getPokemon = await axiosInstance.get('/pokemon?limit=200')

  let formattedPokemons = addPokemonId(getPokemon.data.results)

  return formattedPokemons
}

export { getAllPokemons }
