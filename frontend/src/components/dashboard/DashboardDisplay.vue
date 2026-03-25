<template>
    <v-container>
        <v-card hover @click="load = !load">
            <v-card-item>
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
                            <template #activator>
                                <v-btn variant="tonal" color="red">
                                    Delete
                                </v-btn>
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
const load: Ref<boolean> = ref(false) // Placeholder to load project site later
</script>