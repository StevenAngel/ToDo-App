<template>
    <div class="outlinedContainer rounded">
        <span class="label">{{ props.label }}</span>
        <div class="pa-2">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{label: string }>()
</script>
<style scoped>
.outlinedContainer {
    position: relative;
    border: 1px solid rgb(var(--v-theme-surface-bright));
}

.label {
    position: absolute;
    top: -16px;
    left: 16px;
    padding: 4px;
    background: rgb(var(--v-theme-background));
}
</style>