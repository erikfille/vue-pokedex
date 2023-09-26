<template>
    <div class="cardContainer">
        <h1 class="title" @click="openDetailsModalHandler">{{ name }}</h1>
        <img class="favoriteIcon" :src="icon" alt="favorite" @click="setFavoriteHandler" />
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { usePokemonStore } from '../../stores/pokemon';

import favoriteSelected from '@/assets/icons/favorite-selected.svg?url'
import favoriteUnselected from '@/assets/icons/favorite-unselected.svg?url'

export default {
    name: "ListCard",
    props: {
        name: { default: "Bulbasaur" },
        isFavorite: { default: false },
        id: 1,
    },
    data() {
        return {
            icon: { default: favoriteUnselected }
        };
    },
    methods: {
        ...mapActions(usePokemonStore, ['addFavorite', 'removeFavorite', 'getAndFormatPokemonDetails']),
        setFavoriteIcon() {
            if (this.isFavorite) {
                this.icon = favoriteSelected
            } else this.icon = favoriteUnselected
        },
        async setFavoriteHandler() {
            this.isFavorite ? await this.removeFavorite(this.id) : await this.addFavorite(this.id);
            this.setFavoriteIcon()
        },
        openDetailsModalHandler() {
            this.getAndFormatPokemonDetails(this.id)
        }
    },
    created() {
        this.setFavoriteIcon()
    },
    updated() {
        this.setFavoriteIcon()
    }
};
</script>

<style src="./list-card.scss" scoped></style>