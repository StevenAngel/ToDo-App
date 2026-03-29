<template>
    <v-container>
        <v-sheet class="pa-4 rounded">
            <!-- v-form zum validieren von allen inputs, .prevent zum verhindern vom neuladen der seite -->
            <v-form @submit.prevent="console.log('placeholder')">
                <v-row>
                    <v-col cols="8">
                        <v-text-field label="Title" :rules="[rules.required]" v-model="form.title"></v-text-field>
                        <v-text-field label="Description" v-model="form.description"></v-text-field>
                        <v-combobox v-model="form.categories" chips multiple closable-chips label="Add Tags"
                            hint="Press enter to add"></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <v-btn type="submit">Add Todo</v-btn>
                        <p class="mb-0">Priority</p>
                        <v-chip-group mandatory v-model="form.priority">
                            <v-chip value="low">low</v-chip>
                            <v-chip value="medium">medium</v-chip>
                            <v-chip value="high">high</v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-date-picker title="" v-model="form.deadline"></v-date-picker>
            </v-form>
        </v-sheet>
    </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { rules } from '@/utils/rules';
import type { CreateTodo } from '@/types/todo';

const form = ref<CreateTodo>({
    title: '',
    description: '',
    priority: 'low',
    deadline: undefined,
    categories: [],
    project: undefined,
})
</script>
<style scoped></style>