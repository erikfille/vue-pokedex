import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getAllPokemons } from '@/services/modules/pokemonServices'

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

      console.log('allPokemon', allPokemon.value)
      console.log('allPokemon', filteredPokemon.value)
    } catch (err) {
      console.log(err)
    }
  }

  const filterPokemon = (search) => {
    // LÓGICA PARA FILTRAR POKEMONS
    filteredPokemon.value = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )

    console.log('filteredPokemon', filteredPokemon.value)
  }

  const addFavorite = (id) => {
    // Lógica para guardar un pokemon en favorito
    this.favoritePokemon.push(id)
  }

  const removeFavorite = (id) => {
    // Lógica para guardar un pokemon en favorito
    this.favoritePokemon.filter((f) => f !== id)
  }

  const getPokemonDetails = async (id) => {
    // Logica para traer la info de un pókemon específico y disparar el modal de detalle
    // this.pokemonDetail = await getPokemonDetails(id)
  }

  return {
    allPokemon,
    favoritePokemon,
    filteredPokemon,
    getAndFormatAllPokemon,
    filterPokemon,
    addFavorite,
    removeFavorite,
    getPokemonDetails
  }
})
