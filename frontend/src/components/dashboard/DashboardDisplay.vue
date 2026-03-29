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
                    <v-select label="Sort" v-model="sortBy" :items="['Priority', 'Deadline', 'Tag', 'Project']"
                        class="ml-auto" width="150" hide-details>
                    </v-select>
                    <!-- SORT CONTAINER -->
                    <OutlinedContainer v-for="value in sortedContainers" :label="value">
                        <!-- DASHBOARD ITEM -->
                        <TodoItem v-for="item in filterItems(value)" v-model="todos[todos.indexOf(item)]" />
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
                                            <v-text-field label="Title*" variant="outlined"
                                                v-model="newProject.title"></v-text-field>
                                            <v-text-field label="Description" variant="outlined"
                                                v-model="newProject.description"></v-text-field>
                                            <div class="d-flex ga-2">
                                                <v-spacer></v-spacer>
                                                <v-btn @click="isActive.value = false; createNewProject()"
                                                    variant="tonal" color="green">Create</v-btn>
                                                <v-btn @click="isActive.value = false" variant="tonal">Cancel</v-btn>
                                            </div>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>
                    </v-dialog>
                    <!-- PROJECT ITEM -->
                    <ProjectItem v-for="project in projects" :project="project" />
                </div>
            </v-col>
        </v-row>
        <v-snackbar v-model="createMessage.show" :timeout="5000" color="green">
            {{ createMessage.message }}
        </v-snackbar>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import type { Project, CreateProject } from '@/types/project';
import ProjectItem from './ProjectItem.vue';
import SideNavigation from './SideNavigation.vue';
import OutlinedContainer from '../ui/OutlinedContainer.vue';
import TodoItem from '../todo/TodoItem.vue';
import type { Todo, UpdateTodo } from '@/types/todo';
import { projectApi } from '@/api/projects';
import { todoApi } from '@/api/todos';

const newProject = ref<CreateProject>({
    title: '',
    description: undefined
})

const createMessage = ref({
    show: false,
    message: "Project created successfully",
    color: "green"
})

const todos = ref<Array<Todo>>([]);
const projects = ref<Array<Project>>([]);
const sortBy = ref<string>('Priority');
const view = ref<string>('dashboard');

const createNewProject = async () => {
    const project = await projectApi.create(newProject.value);
    if (project.status == 201) {
        createMessage.value.message = "Project created successfully";
        createMessage.value.color = "green";
        createMessage.value.show = true;
        loadAllProjects();
    } else {
        createMessage.value.message = "Something went wrong, please try again";
        createMessage.value.color = "red";
        createMessage.value.show = true;
    }
}

const loadAllProjects = async () => {
    const allProjects = await projectApi.getAll();
    projects.value = allProjects.data;
    allProjects.data.forEach((project: Project) => {
        if(project.todos) {
            todos.value = [...todos.value, ...project.todos.map(value => {return {...value, project: project.title}})]
        }
    })
}

const updateTodo = async (id: string, value: UpdateTodo) => {
    const todo = await todoApi.update(id, value)
    console.log(todo)
}

const sortedContainers = computed<Array<string>>(() => {
    switch (sortBy.value) {
        case 'Priority':
            return ['high', 'medium', 'low'];
        case 'Deadline':
            const deadlines: Array<string> = [];
            todos.value.forEach((element: Todo) => {
                if (element.deadline) {
                    if (!deadlines.includes(element.deadline)) deadlines.push(element.deadline);
                }
            });

            deadlines.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
            deadlines.push('No Deadline');
            return deadlines;
        case 'Tag':
            const tags: Array<string> = [];
            todos.value.forEach((element: Todo) => {
                element.tags.forEach((tag: string) => {
                    if (!tags.includes(tag)) tags.push(tag);
                });
            });

            tags.push("No Tags");
            return tags;
        case 'Project':
            const projects: Array<string> = [];
            todos.value.forEach((element: Todo) => {
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
            return todos.value.filter((item: Todo) => item.priority == containerValue);
        case 'Deadline':
            if (containerValue == "No Deadline") {
                return todos.value.filter((item: Todo) => item.deadline == undefined);
            } else {
                return todos.value.filter((item: Todo) => item.deadline == containerValue);
            }
        case 'Tag':
            if (containerValue == "No Tags") {
                return todos.value.filter((item: Todo) => item.tags.length == 0);
            } else {
                return todos.value.filter((item: Todo) => item.tags.some(tag => containerValue.includes(tag)));
            }
        case 'Project':
            return todos.value.filter((item: Todo) => item.project == containerValue);
        default:
            return todos.value;
    }
}

watch(projects.value, (newValue, oldValue) => {
    
})

onMounted(loadAllProjects);
</script>