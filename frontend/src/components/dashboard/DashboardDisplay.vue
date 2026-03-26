<template>
    <v-container>
        <!-- PROJECT ITEM -->
        <ProjectItem :project="mockProject" />
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Project } from '@/types/project';
import ProjectItem from './ProjectItem.vue';

const mockProject = ref<Project>({
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
})
</script>