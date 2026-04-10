<template>
    <v-container>
        <v-card>
            <v-card-item>
                <v-card-title>
                    {{ project?.title }}
                </v-card-title>
                <v-card-subtitle>
                    {{ project?.description }}
                </v-card-subtitle>
                <template #append>
                    <v-dialog>
                        <!-- v-slot (#activator) ist das Element, dass den Dialog öffnen soll. Es legt für den v-dialog ein object props an. Es ist ein eventListener wie onClick.  -->
                        <template #activator="{ props }">
                            <!-- mit v-bind binde ich das object an den button, damit vuetify weiß, es muss den dialog onclick öffnen  -->
                            <v-btn variant="tonal" v-bind="props" @click.stop>
                                <v-icon :icon="'mdi-cog'" />
                            </v-btn>
                        </template>
                        <!-- isActive ist ebenfalls eine intern für den dialog angelegte Ref von vuetify, die den wert enthält, ob der dialog offen (true) oder geschlossen (false) ist -->
                        <template #default="{ isActive }">
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="9" lg="9">
                                    <v-form @submit.prevent="updateProject()">
                                        <v-card>
                                            <v-card-title class="text-wrap">
                                                Edit Project
                                            </v-card-title>
                                            <v-container>
                                                <v-sheet class="pa-4 rounded">
                                                    <!-- v-form zum validieren von allen inputs, .prevent zum verhindern vom neuladen der seite -->
                                                    <v-row>
                                                        <v-col cols="9" class="d-flex flex-column ga-2">
                                                            <v-text-field label="New Title" v-model="form.title"
                                                                hide-details="auto"></v-text-field>
                                                            <v-text-field label="New Description" v-model="form.description"
                                                                hide-details="auto"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-sheet>
                                            </v-container>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="isActive.value = false" type="submit"
                                                    color="green">Save</v-btn>
                                                <v-btn @click="isActive.value = false">Cancel</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </template>
                    </v-dialog>

                </template>
            </v-card-item>
        </v-card>
    </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Project, UpdateProject } from '@/types/project';
import { projectApi } from '@/api/projects';
import { useRoute } from 'vue-router';
const route = useRoute();
const project = defineModel<Project>({required: true});
const form = ref<UpdateProject>({
    title: project.value?.title,
    description: project.value?.description
});

const updateProject = async () => {
 try{
    const res = await projectApi.update(route.params.id.toString(), form.value);
    if(res.status == 200) {
        project.value = {
            id: project.value.id,
            todos: project.value.todos,
            title: form.value.title,
            description: form.value.description
        }
    }
 } catch(e) {
    console.error(e);
 }
}
</script>
<style scoped></style>