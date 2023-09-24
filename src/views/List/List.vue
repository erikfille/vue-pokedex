<template>
    <div v-if="Array.isArray(searchResults)">
    </div>
    <div v-else class="errorMessage">
        <h1>Uh-oh!</h1>
        <h3>You look lost on your journey!</h3>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            searchResults: { default: "" },
        };
    },
    methods: {
        getPokemon() {
            // Lógica para traer los pókemon buscados al endpoint de pokeAPI
        },
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