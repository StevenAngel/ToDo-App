<template>
    <!-- Eingebauter :to router-link von vuetify in v-card -->
    <!-- Doch @click benutzen, damit der btn mit click.stop funktioniert, ansonsten wird auch mit dem button die neue seite geladen -->
    <v-card hover @click="router.push({ name: 'project', params: { id: project.id } })">
        <v-card-item>
            <!-- vuetify hat in manchen elementen "slots" die man füllen kann, dies macht man hauptsächlich mit <template>. v-slot:prepend oder kurz (#prepend) sagt vuetify, dass dieses element vorne angehängt werden soll.   -->
            <template #prepend>
                <v-icon icon="mdi-folder" />
            </template>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-subtitle v-if="project.description">
                {{ project.description }}
            </v-card-subtitle>
            <template #append>
                <v-btn flat @click.stop="showProject = !showProject">
                    <v-icon :icon="showProject ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                </v-btn>
            </template>
        </v-card-item>
        <v-expand-transition>
            <v-container v-show="showProject">
                <v-divider></v-divider>
                <v-list class="d-flex flex-column ga-2">
                    <!-- TODO ITEM -->
                    <!-- v-for="mockTodo in mockTodos" geht nicht, da mockTodo eine lokale variable ist, die nicht geschrieben werden kann. Man muss den index nutzen  -->
                    <TodoItem v-for="(todo, index) in project.todos" :key="todo.id" v-model="project.todos![index]" />
                </v-list>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-dialog>
                        <!-- v-slot (#activator) ist das Element, dass den Dialog öffnen soll. Es legt für den v-dialog ein object props an. Es ist ein eventListener wie onClick.  -->
                        <template #activator="{ props }">
                            <!-- mit v-bind binde ich das object an den button, damit vuetify weiß, es muss den dialog onclick öffnen  -->
                            <v-btn variant="tonal" color="red" v-bind="props">
                                Delete
                            </v-btn>
                        </template>
                        <!-- isActive ist ebenfalls eine intern für den dialog angelegte Ref von vuetify, die den wert enthält, ob der dialog offen (true) oder geschlossen (false) ist -->
                        <template #default="{ isActive }">
                            <v-row justify="center">
                                <v-col cols="12" sm="8" md="6" lg="4">
                                    <v-card>
                                        <v-card-title class="text-wrap">
                                            Do you really want to delete this project?
                                        </v-card-title>
                                        <v-card-text>
                                            Deleting this project will permanently delete all associated todos. This
                                            action cannot be undone.
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="isActive.value = false; deleteProject()"
                                                color="red">Delete</v-btn>
                                            <v-btn @click="isActive.value = false">Cancel</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>
                    </v-dialog>
                </v-card-actions>
            </v-container>
        </v-expand-transition>
    </v-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Project } from '@/types/project';
import { projectApi } from '@/api/projects';
import TodoItem from '../todo/TodoItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// TypeScript props weg. ['title', 'description'] == JS
// Zugreifen geht mit project.title oder props.project.titel, da <template> props automatisch auflöst
const props = defineProps<{ project: Project }>();
const emit = defineEmits<{deleted: [id: string]}>();
const showProject = ref<boolean>(false);
const deleteProject = async () => {
    try {
        const deleted = await projectApi.delete(props.project.id.toString());
        if(deleted.status == 200) emit('deleted', props.project.id.toString());
    } catch (e) {
        console.error(e);
    }
}
</script>