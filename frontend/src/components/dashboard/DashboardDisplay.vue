<template>
    <v-container class="d-flex flex-column ga-2">
        <!-- PROJECT ITEM -->
        <ProjectItem v-for="mockProject in mockProjects" :project="mockProject" />
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Project } from '@/types/project';
import ProjectItem from './ProjectItem.vue';

const mockProjects = ref<Array<Project>>([{
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}, {
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}])
</script>