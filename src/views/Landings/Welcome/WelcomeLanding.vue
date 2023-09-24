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
import { StyledButton } from '@/components/Inputs'


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
            this.$router.push({ name: 'list' })
        }
    }
};
</script>

<style scoped>
.welcomeContainer {
    margin: 70px 30px 0px 30px;
    max-width: 315px;
}

.welcomeImage {
    margin-bottom: 60px;
}

.welcomeTitle {
    color: var(--color-text-bold);
    text-align: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 30px;
}

.welcomeDescription {
    color: var(--color-text);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 50px;
}
</style>