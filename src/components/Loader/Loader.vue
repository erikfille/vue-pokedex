<template>
    <div class="loaderContainer">
        <img class="loader" src="/src/assets/icons/pokeball.svg" />
    </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style>
.loaderContainer {
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.loader {
    animation: loader-animation 0.5s linear infinite;
}

@keyframes loader-animation {
    from {
        transform: rotate(0deg);
        /* Comienza la rotación desde 0 grados */
    }

    to {
        transform: rotate(360deg);
        /* Termina la rotación en 360 grados (una vuelta completa) */
    }
}
</style>