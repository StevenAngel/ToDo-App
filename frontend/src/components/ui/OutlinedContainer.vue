<template>
    <div class="outlinedContainer rounded">
        <span class="label">{{ props.label }}</span>
        <v-list class="pa-4 d-flex flex-column ga-2" bg-color="transparent">
            <slot />
        </v-list>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ label: string }>()
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
    z-index: 99;
    background: rgb(var(--v-theme-background));
}
</style>