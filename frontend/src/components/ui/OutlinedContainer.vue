<template>
    <div ref="container" class="outlinedContainer rounded">
        <span class="label" :style="{ backgroundColor: backgroundColor }">{{ props.label }}</span>
        <v-list class="pa-4 d-flex flex-column ga-2" bg-color="transparent">
            <slot />
        </v-list>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const props = defineProps<{ label: string }>();
const container = ref<HTMLElement>();
const backgroundColor = ref<string>('transparent');

function getBackground(el: HTMLElement | null | undefined) {
    while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg != 'transparent' && bg != 'rgba(0, 0, 0, 0)') {
            backgroundColor.value = bg;
            return;
        }

        el = el.parentElement;
    }
}

onMounted(() => {
    getBackground(container.value?.parentElement)
});
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
}
</style>