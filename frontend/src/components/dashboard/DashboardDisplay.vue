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
                <div v-show="showProject">
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item title="Todo 1">
                        </v-list-item>
                    </v-list>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog>
                            <!-- v-slot (#activator) ist das Element, dass den Dialog öffnen soll. Es legt für den v-dialog ein object props an. Es ist ein eventListener wie onClick.  -->
                            <template #activator="{props}">
                                <!-- mit v-bind binde ich das object an den button, damit vuetify weiß, es muss den dialog onclick öffnen  -->
                                <v-btn variant="tonal" color="red" v-bind="props">
                                    Delete
                                </v-btn>
                            </template>
                            <template #default="{ isActive }">
                                <p>test</p>
                            </template>
                        </v-dialog>
                    </v-card-actions>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>
</template>
<script lang="ts" setup>
import { ref, type Ref } from 'vue';

const showProject: Ref<boolean> = ref(false)
const isActive: Ref<boolean> = ref(false)
const load: Ref<boolean> = ref(false) // Placeholder to load project site later
</script>