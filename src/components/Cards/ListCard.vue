<template>
    <div class="cardContainer">
        <h1 class="title">{{ name }}</h1>
        <img :src="icon" alt="" />
    </div>
</template>

<script>
export default {
    name: "ListCard",
    props: {
        name: { default: "Bulbasaur" },
        isFavorite: { default: false },
        id: "1",
    },
    data() {
        return {
            icon: { default: "/src/assets/icons/favorite-unselected.svg" }
        };
    },
    methods: {
        setFavoriteIcon() {
            if (this.isFavorite) {
                this.icon = '/src/assets/icons/favorite-selected.svg'
            } else this.icon = '/src/assets/icons/favorite-unselected.svg'
        }
    },
    created() {
        this.setFavoriteIcon()

        console.log("props", this.$props)
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