<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div class="layoutContainer" v-else>
        <div class="searchInput">
            <StyledInput v-model:searchInput="searchInput" :icon="searchIcon" />
        </div>
        <div :class="results ? 'list' : 'list empty'">
            <List />
        </div>
        <div v-if="results || selectedView === 'favorites'" class="footerButtons">
            <StyledButton v-bind="allButton" />
            <StyledButton v-bind="favoritesButton" />
        </div>
        <GenericModal v-if="pokemonDetails.id">
            <template #img>
                <div class="imageContainer">
                    <img class="backgroundImage" src="/src/assets/images/modal-detail-character-background.jpg" />
                    <img class="closeIcon" src="/src/assets/icons/close-icon.svg" @click="closeModal" />
                    <img v-if="pokemonDetails.image" class="pokemonImage" :src="pokemonDetails.image" />
                </div>
            </template>
            <template #details>
                <div class="detailsContainer">
                    <div class="element">
                        <h3>Name: </h3><span>{{ pokemonDetails.name }}</span>
                    </div>
                    <div class="element">
                        <h3>Weight: </h3><span>{{ pokemonDetails.weight }}</span>
                    </div>
                    <div class="element">
                        <h3>Height: </h3><span>{{ pokemonDetails.height }}</span>
                    </div>
                    <div class="element">
                        <h3>Types: </h3><span>{{ pokemonDetails.types }}</span>
                    </div>
                </div>
            </template>
            <template #footer>
                <StyledButton v-bind="modalButton" />
                <img v-if="pokemonDetails.isFavorite" src="@/assets/icons/favorite-selected.svg" alt="isFavorite"
                    @click="setFavoriteHandler">
                <img v-else src="@/assets/icons/favorite-unselected.svg" alt="isFavorite" @click="setFavoriteHandler">
            </template>
        </GenericModal>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'

import { Loader, List, StyledButton, StyledInput, GenericModal } from '@/components/';

import { copyToClipboard } from '@/utils/'

export default {
    loading: true,
    name: 'BaseLayout',
    components: {
        Loader,
        StyledInput,
        StyledButton,
        List,
        GenericModal
    },
    data() {
        return {
            searchInput: "",
            searchIcon: '/src/assets/icons/looking-glass.svg',
            results: false,
            selectedView: 'list',
            showModal: false,
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
            modalButton: {
                buttonStyles: {
                    height: "44px",
                    width: "195px",
                    fontSize: "17px",
                    fontWeight: "700"
                },
                buttonText: "Share to my friends",
                buttonAction: this.copyPokemonAttributes
            },
        }
    },
    computed: {
        filteredPokemon() {
            return usePokemonStore().filteredPokemon
        },
        pokemonDetails() {
            return usePokemonStore().pokemonDetail
        },
    },
    methods: {
        ...mapActions(usePokemonStore, ['getAndFormatAllPokemon', 'filterPokemon', 'clearPokemonDetails', 'addFavorite', 'removeFavorite']),
        handleListChange() {
            this.selectedView === "list" ? this.selectedView = "favorites" : this.selectedView = "list"
        },
        setModalEvent(callback) {
            document.addEventListener('keydown', function (event) {
                if (event.keyCode === 27) {
                    callback()
                }
            });
        },
        closeModal() {
            this.clearPokemonDetails()
        },
        copyPokemonAttributes() {
            const { name, weight, height, types } = this.pokemonDetails
            let pokemonAttributes = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types}`
            copyToClipboard(pokemonAttributes)
        },
        async setFavoriteHandler() {
            console.log(this.pokemonDetails.isFavorite)
            this.pokemonDetails.isFavorite ? await this.removeFavorite(this.pokemonDetails.id) : await this.addFavorite(this.pokemonDetails.id);
        },

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
        },
        pokemonDetails(val) {
            this.filterPokemon(this.searchInput, this.selectedView)
        }
    },
    created() {
        this.loading = true;
        this.getAndFormatAllPokemon()
        this.setModalEvent(this.clearPokemonDetails)
        this.loading = false
    }
}
</script>

<style src="./base-layout.scss" scoped/>
