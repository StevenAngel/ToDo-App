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
                <div v-show="view == 'dashboard'" class="d-flex flex-column ga-4">
                    <!-- SORT TODOS -->
                    <v-select label="Sort" v-model="sortBy" :items="['Priority', 'Deadline', 'Category', 'Project']"
                        class="ml-auto" width="150" hide-details>
                    </v-select>
                    <!-- SORT CONTAINER -->
                    <OutlinedContainer v-for="value in sortedContainers" :label="value">
                        <!-- DASHBOARD ITEM -->
                        <TodoItem v-for="item in filterItems(value)" v-model="mockTodos[mockTodos.indexOf(item)]" />
                    </OutlinedContainer>
                </div>
                <!-- PROJECTS WRAPPER -->
                <div v-show="view == 'projects'" class="d-flex flex-column ga-2">
                    <!-- ADD PROJECT BUTTON -->
                    <v-dialog>
                        <!-- v-slot (#activator) ist das Element, dass den Dialog öffnen soll. Es legt für den v-dialog ein object props an. Es ist ein eventListener wie onClick.  -->
                        <template #activator="{ props }">
                            <!-- mit v-bind binde ich das object an den button, damit vuetify weiß, es muss den dialog onclick öffnen  -->
                            <v-btn v-bind="props" class="ml-auto">
                                NEW PROJECT
                            </v-btn>
                        </template>
                        <!-- isActive ist ebenfalls eine intern für den dialog angelegte Ref von vuetify, die den wert enthält, ob der dialog offen (true) oder geschlossen (false) ist -->
                        <template #default="{ isActive }">
                            <v-row justify="center">
                                <v-col cols="12" sm="8" md="6" lg="4">
                                    <v-card>
                                        <v-card-title class="text-wrap">
                                            CREATE A NEW PROJECT
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-container>
                                            <v-text-field label="Title*" variant="outlined"></v-text-field>
                                            <v-text-field label="Description" variant="outlined"></v-text-field>
                                            <div class="d-flex ga-2">
                                                <v-spacer></v-spacer>
                                                <v-btn @click="isActive.value = false" variant="tonal" color="green">Create</v-btn>
                                                <v-btn @click="isActive.value = false" variant="tonal">Cancel</v-btn>
                                            </div>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>
                    </v-dialog>
                    <!-- PROJECT ITEM -->
                    <ProjectItem v-for="mockProject in mockProjects" :project="mockProject" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Project } from '@/types/project';
import ProjectItem from './ProjectItem.vue';
import SideNavigation from './SideNavigation.vue';
import OutlinedContainer from '../ui/OutlinedContainer.vue';
import TodoItem from '../todo/TodoItem.vue';
import type { Todo } from '@/types/todo';

const mockTodos = ref<Array<Todo>>([{
    id: 4,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "medium",
    deadline: "2027-03-28",
    categories: [],
    isDone: false,
    project: "Mock Project2"
}, {
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: "2026-03-28",
    categories: [],
    isDone: false,
    project: "Mock Project2"

}, {
    id: 2,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "medium",
    deadline: "2026-03-27",
    categories: [],
    isDone: false,
    project: "Mock Project2"
}, {
    id: 5,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: "2026-03-27",
    categories: [],
    isDone: false,
    project: "Mock Project"
}, {
    id: 3,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "high",
    categories: ['Mock Category', 'Category 2'],
    isDone: false,
    project: "Mock Project"
}]);

const mockProjects = ref<Array<Project>>([{
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}, {
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description"
}]);

const sortBy = ref<string>('Priority')
const view = ref<string>('dashboard')

const sortedContainers = computed<Array<string>>(() => {
    switch (sortBy.value) {
        case 'Priority':
            return ['high', 'medium', 'low'];
        case 'Deadline':
            const deadlines: Array<string> = [];
            mockTodos.value.forEach((element: Todo) => {
                if (element.deadline) {
                    if (!deadlines.includes(element.deadline)) deadlines.push(element.deadline);
                }
            });

            deadlines.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
            deadlines.push('No Deadline');
            return deadlines;
        case 'Category':
            const categories: Array<string> = [];
            mockTodos.value.forEach((element: Todo) => {
                element.categories.forEach((category: string) => {
                    if (!categories.includes(category)) categories.push(category);
                });
            });

            categories.push("No Category");
            return categories;
        case 'Project':
            const projects: Array<string> = [];
            mockTodos.value.forEach((element: Todo) => {
                if (element.project) {
                    if (!projects.includes(element.project)) projects.push(element.project);
                }
            });

            return projects;
        default:
            return [];
    }
})

const filterItems = (containerValue: string): Array<Todo> => {
    switch (sortBy.value) {
        case 'Priority':
            return mockTodos.value.filter((item: Todo) => item.priority == containerValue);
        case 'Deadline':
            if (containerValue == "No Deadline") {
                return mockTodos.value.filter((item: Todo) => item.deadline == undefined);
            } else {
                return mockTodos.value.filter((item: Todo) => item.deadline == containerValue);
            }
        case 'Category':
            if (containerValue == "No Category") {
                return mockTodos.value.filter((item: Todo) => item.categories.length == 0);
            } else {
                return mockTodos.value.filter((item: Todo) => item.categories.some(category => containerValue.includes(category)));
            }
        case 'Project':
            return mockTodos.value.filter((item: Todo) => item.project == containerValue);
        default:
            return mockTodos.value;
    }
}
</script>