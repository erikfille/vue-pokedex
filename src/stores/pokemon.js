import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getAllPokemons, getPokemonByName } from '@/services/modules/pokemonServices'

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemon = ref([])
  const favoritePokemon = ref([])
  const filteredPokemon = ref([])
  const pokemonDetail = ref({})
  const actualSearch = ref('')

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
    actualSearch.value = search

    if (type === 'list') {
      filteredPokemon.value = allPokemon.value

      if (search)
        filteredPokemon.value = allPokemon.value.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    if (type === 'favorites') {
      filteredPokemon.value = allPokemon.value.filter((p) => p.isFavorite)

      if (search)
        filteredPokemon.value = filteredPokemon.value.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
    }
  }

  const addFavorite = (id) => {
    let favorites = [...new Set([...favoritePokemon.value, id])]
    favoritePokemon.value = favorites

    allPokemon.value = allPokemon.value.map((p) => {
      if (p.id === id) p.isFavorite = true
      return p
    })

    filteredPokemon.value = filteredPokemon.value.map((p) => {
      if (p.id === id) p.isFavorite = true
      return p
    })
  }

  const removeFavorite = (id) => {
    favoritePokemon.value = favoritePokemon.value.filter((f) => f !== id)

    allPokemon.value = allPokemon.value.map((p) => {
      if (p.id === id) p.isFavorite = false
      return p
    })

    filteredPokemon.value = filteredPokemon.value.map((p) => {
      if (p.id === id) p.isFavorite = false
      return p
    })

    filterPokemon(actualSearch.value, 'favorites')
  }

  const getPokemonDetails = async (name) => {
    // Logica para traer la info de un pókemon específico y disparar el modal de detalle
    let pokemon = await getPokemonByName(name)

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
