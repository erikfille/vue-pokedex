<template>
    <div v-if="searchResults">
        <div v-for="result in searchResults">
            <ListCard v-bind="result" :key="result.id" />
        </div>
    </div>
    <div v-else class="errorMessage">
        <h1>Uh-oh!</h1>
        <h3>You look lost on your journey!</h3>
        <StyledButton v-if="!searchResults" v-bind="backButton" />
    </div>
</template>

<script>
import ListCard from '../../components/Cards/ListCard.vue';

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
    methods: {
        addFavorite() {
            // Lógica para guardar un pokemon en favorito
        },
        getPokemonDetails() {
            // Logica para traer la info de un pókemon específico y disparar el modal de detalle
        }
    },
};
</script>

<style scoped>
.errorMessage {
    gap: 4px;
}
</style>