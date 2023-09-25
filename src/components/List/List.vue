<template>
    <div class="listContainer" v-if="filteredPokemon.length > 0">
        <div v-for="pokemon in filteredPokemon">
            <ListCard v-bind="pokemon" :key="pokemon.id" />
        </div>
    </div>
    <div v-else class="errorMessage">
        <h1>Uh-oh!</h1>
        <h3>You look lost on your journey!</h3>
        <StyledButton v-bind="backButton" />
    </div>
</template>

<script>
import { usePokemonStore } from '@/stores/pokemon.js'
import { Loader, ListCard, StyledButton } from '@/components'

export default {
    name: "List",
    components: { Loader, ListCard, StyledButton },
    data() {
        return {
            searchResults: [{
                title: "Bulbasaur",
                isFavorite: true,
                id: 123,
                key: 123
            }],
            backButton: {
                buttonStyles: {
                    height: "44px",
                    width: "155px",
                    fontSize: "18px",
                    padding: "14px",
                    marginTop: "25px"
                },
                buttonText: "Go back home",
                buttonAction: this.redirectHomeHandler
            },
        };
    },
    computed: {
        filteredPokemon() {
            return usePokemonStore().filteredPokemon;
        },
    },
    methods: {
        redirectHomeHandler() {
            this.$router.push({ name: 'welcomeLanding' })
        },
    },

};
</script>

<style src="./list.scss" scoped></style>