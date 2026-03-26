<template>
    <v-container>
        <v-card hover @click="load = !load">
            <v-card-item>
                <!-- vuetify hat in manchen elementen "slots" die man füllen kann, dies macht man hauptsächlich mit <template>. v-slot:prepend oder kurz (#prepend) sagt vuetify, dass dieses element vorne angehängt werden soll.   -->
                <template #prepend>
                    <v-icon icon="mdi-folder" />
                </template>
                <v-card-title>Project Title</v-card-title>
                <v-card-subtitle>
                    Project Description
                </v-card-subtitle>
                <template #append>
                    <v-btn flat @click="showProject = !showProject">
                        <v-icon :icon="showProject ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                    </v-btn>
                </template>
            </v-card-item>
            <v-expand-transition>
                <v-container v-show="showProject">
                    <v-divider></v-divider>
                    <v-list>
                        <!-- TODO ITEM -->
                        <v-list-item class="priority-low rounded-lg" @click="mockTodo.isFinished = !mockTodo.isFinished">
                            <template #prepend>
                                <!-- click.stop stoppt den click, da wir schon auf dem list item den click handlen -->
                                <v-checkbox-btn :model-value="mockTodo.isFinished" @click.stop></v-checkbox-btn>
                            </template>
                            <v-list-item-title :class="{ 'text-decoration-line-through': mockTodo.isFinished }">{{ mockTodo.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ mockTodo.description }}</v-list-item-subtitle>

                            <template #append>
                                <!-- div statt v-chip-group, da v-chip-group farbe aller child überschreibt. -->
                                <!-- class display-flex und gap-2 (8px) -->
                                <div class="d-flex ga-2">
                                    <v-chip color="green">
                                        {{ mockTodo.priority }}
                                    </v-chip>
                                    <v-chip :color="mockTodo.deadline && mockTodo.deadline <= new Date() ? 'red' : ''">
                                        {{ mockTodo.deadline?.toLocaleDateString() }}
                                    </v-chip>
                                </div>
                            </template>
                        </v-list-item>
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
                                                Deleting this project will automatically delete all todos irreversible.
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="isActive.value = false" color="red">Delete</v-btn>
                                                <v-btn @click="isActive.value = false">Abort</v-btn>
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
    </v-container>
</template>

<script lang="ts" setup>
import type { Todo } from '@/types/todo';
import { ref, type Ref } from 'vue';

const showProject: Ref<boolean> = ref(false);
const mockTodo: Ref<Todo> = ref({
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: new Date("2026-01-01"),
    isFinished: false
})
const load: Ref<boolean> = ref(false); // Placeholder to load project site later
</script>

<style scoped>
.priority-low {
    border: 4px solid rgb(var(--v-theme-success))
}
</style>