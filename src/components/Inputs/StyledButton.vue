<template>
    <button class="styledButton" :style="buttonStyles" :disabled="disabled" @click="() => handleButtonClick()"><img
            v-if="buttonIcon" :src='buttonIcon' alt="Icon" /><span>{{
                buttonText }}</span></button>
</template>

<script>
export default {
    name: "StyledButton",
    props: {
        buttonText: { default: "Get started" },
        buttonIcon: "",
        buttonAction: { type: Function, default: () => console.log("Se dispara la accion") },
        buttonStyles: {
            default: {
                width: "130px",
                height: "44px"
            }
        },
        disabled: {
            default: false
        },
    },
    data() {
        return {

        };
    },
    methods: {
        handleButtonClick() {
            this.buttonAction()
        }
    },
    computed: {
    },
    created() {
    },
};
</script>

<style src="./styled-button.scss" scoped></style>