<template>
    <v-container>
        <v-sheet class="rounded">
            <v-tabs v-model="tab" grow>
                <v-tab value="open">Open</v-tab>
                <v-tab value="done">Done</v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="open" class="pa-2 d-flex flex-column ga-2">
                    <TodoItem v-for="todo in todos.filter(value => !value.isDone)"
                        v-model="todos[todos.indexOf(todo)]"></TodoItem>
                </v-tabs-window-item>
                <v-tabs-window-item value="done" class="pa-2 d-flex flex-column ga-2">
                    <TodoItem v-for="todo in todos.filter(value => value.isDone)"
                        v-model="todos[todos.indexOf(todo)]"></TodoItem>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-sheet>
    </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Todo } from '@/types/todo';
import TodoItem from '../todo/TodoItem.vue';

const todos = defineModel<Array<Todo>>({ required: true });
const tab = ref<string>('open')
</script>