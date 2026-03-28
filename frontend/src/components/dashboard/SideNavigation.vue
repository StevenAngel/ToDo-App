<template>
    <v-card>
        <v-card-title>
            Navigation
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
            <v-list-item @click="view = 'dashboard'">
                <template #prepend>
                    <v-icon icon="mdi-view-dashboard"></v-icon>
                </template>
                <v-list-item-title>
                    Dashboard
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="view = 'projects'">
                <template #prepend>
                    <v-icon icon="mdi-folder"></v-icon>
                </template>
                <v-list-item-title>
                    Projects
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts" setup>
    const view = defineModel<string>({required: true});
</script>