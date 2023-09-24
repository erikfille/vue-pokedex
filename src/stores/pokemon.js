import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getAllPokemons, getPokemonByName } from '@/services/modules/pokemonServices'

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemon = ref([])
  const favoritePokemon = ref([])
  const filteredPokemon = ref([])
  const pokemonDetail = ref({})

  const getAndFormatAllPokemon = async () => {
    try {
      allPokemon.value = await getAllPokemons()

      if (favoritePokemon.length > 0 && allPokemon.length > 0) {
        allPokemon.value = allPokemon.forEach((p) => {
          if (this.favoritePokemon.includes(p.id)) p.isFavorite = true
          else p.isFavorite = false
        })
      }
      filteredPokemon.value = allPokemon.value
    } catch (err) {
      console.log(err)
    }
  }

  const filterPokemon = (search, type) => {
    // LÓGICA PARA FILTRAR POKEMONS

    console.log('search filter', search)

    if (type === 'list') {
      filteredPokemon.value = allPokemon.value

      filteredPokemon.value = allPokemon.value.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (type === 'favorites') {
      filteredPokemon.value = favoritePokemon.value

      console.log("filteredPokemon", filteredPokemon.value)

      filteredPokemon.value = favoritePokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }
  }

  const addFavorite = (id) => {
    // Lógica para guardar un pokemon en favorito
    this.favoritePokemon.push(id)
  }

  const removeFavorite = (id) => {
    // Lógica para guardar un pokemon en favorito
    this.favoritePokemon.filter((f) => f !== id)
  }

  const getPokemonDetails = async (name) => {
    // Logica para traer la info de un pókemon específico y disparar el modal de detalle
    let pokemon = await getPokemonByName(name)

    console.log('pokemon', pokemon)

    this.pokemonDetail.value = pokemon
  }

  return {
    allPokemon,
    favoritePokemon,
    filteredPokemon,
    pokemonDetail,
    getAndFormatAllPokemon,
    filterPokemon,
    addFavorite,
    removeFavorite,
    getPokemonDetails
  }
})
