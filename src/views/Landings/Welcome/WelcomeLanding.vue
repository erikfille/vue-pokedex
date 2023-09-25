<template>
    <div class="welcomeContainer">
        <img class="welcomeImage" :src="landingImg" :style="imgStyle" alt="Welcome Image">
        <h1 class="welcomeTitle">Welcome to Pokédex</h1>
        <h3 class="welcomeDescription">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers
            in the Pokémon world.</h3>
        <StyledButton buttonText="Get started" :buttonAction="redirectHandler" />
    </div>
</template>

<script>
import pikachuWelcomeImg from "@/assets/images/pikachu-welcome.png"
import { StyledButton } from '@/components/'

export default {
    name: "WelcomeLanding",
    components: { StyledButton },
    data() {
        return {
            landingImg: pikachuWelcomeImg,
            imgStyle: { width: '325px', height: 'auto' }
        };
    },
    methods: {
        redirectHandler() {
            this.$router.push({ name: 'app' })
        }
    }
};
</script>

<style src="./welcome-landing.scss" scoped></style>