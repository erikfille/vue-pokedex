<template>
    <div class="inputContainer">
        <img v-if="icon" class="inputIcon" src="@/assets/icons/looking-glass.svg" alt="icon" />
        <input class="styledInput" :style="inputStyles" :placeholder="placeholder" :disabled="disabled"
            @click="() => handleInputChange()" />
    </div>
</template>

<script>
export default {
    name: "StyledInput",
    props: {
        name: { default: "styledInput" },
        inputStyles: { width: "315px", height: "50px" },
        placeholder: { default: "Search" },
        icon: { default: "@/assets/icons/looking-glass.svg" },
        inputAction: {
            type: Function,
            default: () => { }
        }
    },
    data() {
        return {

        };
    },
    methods: {
        handleInputChange() {
            this.inputAction()
        }
    },
    created() {

    },
};
</script>

<style scoped>
.inputContainer {
    position: relative;
    width: 315px;
    height: 50px;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    background: var(--color-background);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
}

.styledInput {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 14px 15px 14px 45px;
}

.inputIcon {
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 15px;
}
</style>