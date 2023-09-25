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

<style src="./styled-input.scss" scoped></style>