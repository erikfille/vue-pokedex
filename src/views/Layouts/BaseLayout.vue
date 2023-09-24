<template>
    <div class="searchInput">
        <StyledInput v-model:searchInput="searchInput" />
    </div>
    <div class="list">
        <List />
    </div>
    <div v-if="results || selectedView === 'favorites'" class="footerButtons">
        <StyledButton v-bind="allButton" />
        <StyledButton v-bind="favoritesButton" />
    </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'

import { List, StyledButton, StyledInput } from '@/components/';

export default {
    name: 'BaseLayout',
    components: { RouterView, StyledInput, StyledButton, List },
    data() {
        return {
            searchInput: "",
            results: false,
            selectedView: 'list',
            allButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                },
                buttonText: "All",
                buttonIcon: "/src/assets/icons/list-items.svg",
                buttonAction: this.handleListChange,
                disabled: true,
            },
            favoritesButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                },
                buttonText: "Favorites",
                buttonIcon: "/src/assets/icons/favorites-star.svg",
                buttonAction: this.handleListChange
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
        handleListChange() {
            this.selectedView === "list" ? this.selectedView = "favorites" : this.selectedView = "list"
        }
    },
    watch: {
        filteredPokemon(val) {
            if (val.length) this.results = true
            else this.results = false
        },
        searchInput(val) {
            this.filterPokemon(val, this.selectedView)
        },
        selectedView(val) {
            console.log("selectedView modified")
            this.filterPokemon(this.searchInput, val)
            if (val === 'list') {
                this.allButton = {
                    ...this.allButton,
                    disabled: true,
                }

                this.favoritesButton = {
                    ...this.favoritesButton,
                    disabled: false,
                }
            } else {
                this.allButton = {
                    ...this.allButton,
                    disabled: false,
                }

                this.favoritesButton = {
                    ...this.favoritesButton,
                    disabled: true,
                }
            }
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
