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
        console.log(this.$props)
    },
};
</script>

<style scoped>
.styledButton {
    position: relative;
    padding: 11px 20px;
    font-size: 17px;
    line-height: 0%;
}
</style>