<template>

    <v-container>
        <v-row>
            <!-- weite: 12 cols (100%), ab medium bildschirm width: 2 cols -->
            <v-col cols="12" md="2">
                <!-- SIDE NAVIGATION -->
                <SideNavigation v-model="view"></SideNavigation>
            </v-col>
            <v-col cols="12" md="10">
                <!-- div statt v-container damit kein extra padding / margin angewandt wird -->
                 <!-- PROJECTS WRAPPER -->
                <div v-show="view == 'projects'" class="d-flex flex-column ga-2">
                    <!-- PROJECT ITEM -->
                    <ProjectItem v-for="mockProject in mockProjects" :project="mockProject" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Project } from '@/types/project';
import ProjectItem from './ProjectItem.vue';
import SideNavigation from './SideNavigation.vue';

const mockProjects = ref<Array<Project>>([{
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}, {
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}])

const view = ref<string>('dashboard')
</script>