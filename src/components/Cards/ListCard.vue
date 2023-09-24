<template>
    <div class="cardContainer">
        <h1 class="title">{{ name }}</h1>
        <img :src="icon" alt="favorite" @click="setFavoriteHandler" />
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { usePokemonStore } from '../../stores/pokemon';

export default {
    name: "ListCard",
    props: {
        name: { default: "Bulbasaur" },
        isFavorite: { default: false },
        id: 1,
    },
    data() {
        return {
            icon: { default: "/src/assets/icons/favorite-unselected.svg" }
        };
    },
    methods: {
        ...mapActions(usePokemonStore, ['addFavorite', 'removeFavorite']),
        setFavoriteIcon() {
            if (this.isFavorite) {
                this.icon = '/src/assets/icons/favorite-selected.svg'
            } else this.icon = '/src/assets/icons/favorite-unselected.svg'
        },
        async setFavoriteHandler() {
            console.log("isFavorite", this.isFavorite, "id", this.id);
            this.isFavorite ? await this.removeFavorite(this.id) : await this.addFavorite(this.id);
            this.setFavoriteIcon()
        }
    },
    created() {
        this.setFavoriteIcon()
    },
    updated() {
        console.log("updatedComponent", this.$props)
    }
};
</script>

<style scoped>
.cardContainer {
    flex-direction: row;
    justify-content: space-between;
    border-radius: 5px;
    background: var(--color-absolute-white);
    padding: 17px 10px 17px 20px;

    margin-bottom: 10px;

    width: 315px;
    height: 60px;
}

.title {
    color: var(--color-text-black);
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
</style>