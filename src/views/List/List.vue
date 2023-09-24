<template>
    <div v-if="filteredPokemon">
        <div v-for="pokemon in filteredPokemon">
            <ListCard v-bind="pokemon" :key="pokemon.id" />
        </div>
    </div>
    <div v-else class="errorMessage">
        <h1>Uh-oh!</h1>
        <h3>You look lost on your journey!</h3>
        <StyledButton v-if="!searchResults" v-bind="backButton" />
    </div>
</template>

<script>
import { mapState, storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'
import Loader from '@/components/Loader/Loader.vue'
import ListCard from '@/components/Cards/ListCard.vue';

export default {
    name: "List",
    components: { ListCard },
    props: {
    },
    data() {
        return {
            searchResults: [{
                title: "Bulbasaur",
                isFavorite: true,
                id: 123,
                key: 123
            }],
        };
    },
    computed: {
        filteredPokemon() {
            return usePokemonStore().filteredPokemon;
        },
    },
    methods: {
    },
    mounted() {
        console.log('Componente montado');
        // Puedes verificar aquí si los datos se han cargado correctamente.
        console.log("Filtered Pokemon", this.filteredPokemon)
    }
};
</script>

<style scoped>
.errorMessage {
    gap: 4px;
}
</style>