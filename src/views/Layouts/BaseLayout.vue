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

<style scoped>
.layoutContainer {
    height: 100%;
}

.searchInput {
    position: fixed;
    top: 0;
    margin: 35px 30px 0px 30px;
}

.list {
    height: 75%;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 125px 30px 80px 30px;
    place-content: flex-start;
    overflow-y: scroll;

    &.empty {
        overflow-y: hidden;
    }
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

.imageContainer {
    position: relative;
    width: 315px;
    height: 220px;
    border-radius: 5px 5px 0 0;
}

.backgroundImage {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
}

.closeIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
}

.pokemonImage {
    position: absolute;
    top: 5%;
    left: auto;
    z-index: 3;
    width: auto;
    height: 95%;
    border-radius: 5px;
}

.detailsContainer {
    margin-top: 220px;
    width: 100%;
}

.element {
    flex-direction: row;
    width: 100%;
    height: 47px;
    border-bottom: 1px solid var(--color-separator);
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    & h3 {
        color: var(--color-text-soft-black);
        font-size: 18px;
        font-weight: 600;
        line-height: 150%;
    }

    & span {
        color: var(--color-text-soft-black);
        font-size: 18px;
        font-weight: 500;
        line-height: 150%;
    }
}
</style>
