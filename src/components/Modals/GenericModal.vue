<template>
    <div :class="['fullscreenBackground', { 'active': showModal }]"></div>
    <div :class="['genericModal', { 'active': showModal }]">
        <div class="header">
            <slot name="img"></slot>
        </div>
        <div class="details">
            <slot name="details"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "GenericModal",
    props: {
        showModal: Boolean,
    },
}
</script>

<style src="./generic-modal.scss" scoped></style>