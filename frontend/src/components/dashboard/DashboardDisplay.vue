<template>
    <v-container>
        <v-row>
            <!-- weite: 12 cols (100%), ab medium bildschirm width: 2 cols -->
            <v-col cols="12" lg="2" md="4">
                <!-- SIDE NAVIGATION -->
                <SideNavigation v-model="view"></SideNavigation>
            </v-col>
            <v-col cols="12" lg="10" md="8">
                <!-- div statt v-container damit kein extra padding / margin angewandt wird -->
                <!-- DASHBOARD WRAPPER -->
                <div v-show="view == 'dashboard'" class="d-flex flex-column ga-2">
                    <!-- DASHBOARD ITEM -->
                    
                </div>
                <!-- PROJECTS WRAPPER -->
                <div v-show="view == 'projects'" class="d-flex flex-column ga-2">
                    <!-- ADD PROJECT BUTTON -->
                     <v-btn class="mr-auto" @click="console.log('placeholder')">NEW PROJECT</v-btn>
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