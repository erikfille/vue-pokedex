<template>
    <div class="inputContainer">
        <img v-if="icon" class="inputIcon" :src="icon" alt="icon" />
        <input class="styledInput" :value="searchInput" @input="$emit('update:searchInput', $event.target.value)"
            :style="inputStyles" :placeholder="placeholder" :disabled="disabled" />

    </div>
</template>

<script>
export default {
    name: "StyledInput",
    props: {
        searchInput: { type: String },
        inputStyles: { default: { width: "315px", height: "50px" } },
        placeholder: { default: "Search" },
        icon: { default: "/src/assets/icons/looking-glass.svg" },
        inputAction: {
            type: Function,
            default: () => { }
        },
        disabled: { default: false }
    },
    data() {
        return {

        };
    },
    methods: {
        updateSearchInput(e) {
            this.$emit('update:searchInput', e.target.value)
        }
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