<template>
    <div class="layoutContainer">
        <div v-if="loading">
            <Loader />
        </div>
        <div class="searchInput">
            <StyledInput v-model:searchInput="searchInput" :icon="searchIcon" />
        </div>
        <div :class="results ? 'list' : 'list empty'">
            <List />
        </div>
        <div v-if="results || selectedView === 'favorites'" class="footerButtons">
            <StyledButton v-if="allButton" v-bind="allButton" />
            <StyledButton v-if="favoritesButton" v-bind="favoritesButton" />
        </div>
        <GenericModal :showModal="pokemonDetails.id">
            <template #img>
                <div class="imageContainer">
                    <img class="backgroundImage" src="@/assets/images/modal-detail-character-background.jpg" />
                    <img class="closeIcon" src="@/assets/icons/close-icon.svg" @click="closeModal" />
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
                <img class="favoriteIcon" v-else src="@/assets/icons/favorite-unselected.svg" alt="isFavorite"
                    @click="setFavoriteHandler">
            </template>
        </GenericModal>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'

import { Loader, List, StyledButton, StyledInput, GenericModal } from '@/components/';

import { copyToClipboard } from '@/utils/'

import lookingGlass from '@/assets/icons/looking-glass.svg?url'
import listItems from '@/assets/icons/list-items.svg?url'
import favoritesStar from '@/assets/icons/favorites-star.svg?url'

export default {
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
            searchIcon: lookingGlass,
            results: false,
            selectedView: 'list',
            showModal: 0,
            windowWidth: '',
            allButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                },
                buttonText: "All",
                buttonIcon: listItems,
                buttonAction: this.handleListChange,
                disabled: true,
            },
            favoritesButton: {
                buttonStyles: {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px"
                },
                buttonText: "Favorites",
                buttonIcon: favoritesStar,
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
        loading() {
            return usePokemonStore().loading
        }
    },
    methods: {
        ...mapActions(usePokemonStore, ['getAndFormatAllPokemon', 'filterPokemon', 'clearPokemonDetails', 'addFavorite', 'removeFavorite']),
        handleListChange() {
            this.selectedView === "list" ? this.selectedView = "favorites" : this.selectedView = "list"
        },
        setModalEvent(callback) {
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    callback()
                }
            });
        },
        closeModal() {
            this.clearPokemonDetails()
        },
        async copyPokemonAttributes() {
            const { name, weight, height, types } = this.pokemonDetails
            let pokemonAttributes = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types}`
            copyToClipboard(pokemonAttributes)

            let newModalButton = { ...this.modalButton };
            newModalButton.buttonText = "Copied to clipboard!"
            this.modalButton = newModalButton
            this.loadDelay(2000).then(() => {
                newModalButton.buttonText = "Share to my friends"
                this.modalButton = { ...newModalButton }
            });
        },
        async setFavoriteHandler() {
            this.pokemonDetails.isFavorite ? await this.removeFavorite(this.pokemonDetails.id) : await this.addFavorite(this.pokemonDetails.id);
        },
        getButtonStyles() {
            let styles
            let modalButtonStyle
            if (this.windowWidth >= 1024) {
                styles = {
                    height: "44px",
                    width: "275px",
                    fontSize: "18px",
                }
                modalButtonStyle = {
                    height: "44px",
                    width: "195px",
                    fontSize: "17px",
                    fontWeight: "700"
                }
            } else if (this.windowWidth < 1024) {
                // No es necesario, pero queda declarado por si es necesario agregar otros tamaños
                styles = {
                    height: "44px",
                    width: "150px",
                    fontSize: "18px",
                }
                modalButtonStyle = {
                    height: "44px",
                    width: "195px",
                    fontSize: "17px",
                    fontWeight: "700"
                }
            }
            this.allButton = {
                ...this.allButton,
                buttonStyles: styles,
            }
            this.favoritesButton = {
                ...this.favoritesButton,
                buttonStyles: styles,
            }
            this.favoritesButton = {
                ...this.favoritesButton,
                buttonStyles: styles,
            }
        },
        async loadDelay(milisec) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, milisec);
            });
        },
        setWindowWidth() {
            this.windowWidth = window.innerWidth;
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
        },
        windowWidth(val) {
            this.getButtonStyles()
        }
    },
    async created() {
        await this.getAndFormatAllPokemon()
        this.setModalEvent(this.clearPokemonDetails)
        window.addEventListener('resize', this.setWindowWidth);
        this.getButtonStyles()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setWindowWidth);
    }
}
</script>

<style src="./base-layout.scss" scoped/>
