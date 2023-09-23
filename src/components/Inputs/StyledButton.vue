<template>
    <button class="styledButton" :style="buttonStyles" :disabled="disabled" @click="() => handleButtonClick()">{{
        buttonText }}</button>
</template>

<script>
export default {
    name: "StyledButton",
    props: {
        buttonText: { default: "Get started" },
        buttonStyles: {
            default: {
                width: "130px",
                height: "44px"
            }
        },
        disabled: {
            default: false
        },
        buttonAction: { type: Function, default: () => console.log("Se dispara la accion") }
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

<style>
.styledButton {
    display: flex;
    padding: 11px 20px;
    align-items: center;
    justify-content: center;
    gap: 10px;

    border-radius: 60px;
    background-color: #F22539;
    color: var(--color-background);

    text-align: center;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:disabled {
        background-color: var(--color-disabled);
        cursor: default;
    }
}
</style>