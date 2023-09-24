<template>
    <div class="searchInput">
        <StyledInput v-model:searchInput="searchInput" />
    </div>
    <div class="list">
        <RouterView />
        <StyledButton v-if="!results" v-bind="backButton" />
    </div>
    <div v-if="results" class="footerButtons">
        <StyledButton v-bind="allButton" />
        <StyledButton v-bind="favoritesButton" />
    </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'

import { StyledButton, StyledInput } from '@/components/Inputs';

export default {
    name: 'BaseLayout',
    components: { RouterView, StyledInput, StyledButton },
    data() {
        return {
            searchInput: "",
            results: false,
            allButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                },
                buttonText: "All",
                buttonIcon: "/src/assets/icons/list-items.svg",
                buttonAction: () => { }
            },
            favoritesButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                },
                buttonText: "Favorites",
                buttonIcon: "/src/assets/icons/favorites-star.svg",
                buttonAction: () => { }
            },
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
        }
    },
    computed: {
        filteredPokemon() {
            return usePokemonStore().filteredPokemon
        },
    },
    methods: {
        ...mapActions(usePokemonStore, ['getAndFormatAllPokemon', 'filterPokemon']),
        redirectHomeHandler() {
            this.$router.push({ name: 'welcomeLanding' })
        },
        onInputChange() {

        },
    },
    watch: {
        filteredPokemon(val) {
            if (val.length) this.results = true
            else this.results = false
        },
        searchInput(val) {
            this.filterPokemon(val, "list")
        }
    },
    created() {
        this.getAndFormatAllPokemon()
    }
}
</script>

<style scoped>
.searchInput {
    position: fixed;
    top: 0;
    margin: 35px 30px 0px 30px;
}

.list {
    align-items: flex-start;
    margin: 125px 30px 80px 30px;
    overflow-y: scroll;
    place-content: flex-start;
    justify-content: flex-start;
}

.footerButtons {
    position: fixed;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    height: 80px;

    background: var(--color-absolute-white);
    box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.05);
}
</style>
