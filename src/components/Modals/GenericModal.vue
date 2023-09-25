<template>
    <div class="fullscreenBackground"></div>
    <div class="genericModal">
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
    name: "GenericModal"
}
</script>

<style src="./generic-modal.scss" scoped></style>