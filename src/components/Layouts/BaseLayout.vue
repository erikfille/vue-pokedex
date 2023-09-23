<template>
    <div class="searchInput">
        <StyledInput />
    </div>
    <div class="list">
        <RouterView />
    </div>
    <div class="footerButtons">
        <StyledButton :buttonStyles="buttonStyles" v-bind="button1" />
        <StyledButton :buttonStyles="buttonStyles" v-bind="button2" />
    </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { StyledButton, StyledInput } from '@/components/Inputs';

export default {
    name: 'BaseLayout',
    components: { RouterView, StyledInput, StyledButton },
    data() {
        return {
            buttonStyles: {
                height: "44px",
                width: "150px",
                fontSize: "18px",
                flexShrink: "0"
            },
            button1: {
                buttonText: "All",
                buttonIcon: "/src/assets/icons/list-items.svg",
                buttonAction: () => { }
            },
            button2: {
                buttonText: "Favorites",
                buttonIcon: "/src/assets/icons/favorites-star.svg",
                buttonAction: () => { }
            },
        }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>
.searchInput {
    margin: 35px 30px 0px 30px;
}

.list {
    margin: 0 30px;
}

.footerButtons {
    position: fixed;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    gap: 15px;
    height: 80px;

    background: var(--color-absolute-white);
    box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.05);
}
</style>
