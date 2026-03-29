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
                    <TodoItem v-for="todo in mockTodos.filter(value => !value.isDone)" v-model="mockTodos[mockTodos.indexOf(todo)]"></TodoItem>
                </v-tabs-window-item>
                <v-tabs-window-item value="done" class="pa-2 d-flex flex-column ga-2">
                    <TodoItem v-for="todo in mockTodos.filter(value => value.isDone)" v-model="mockTodos[mockTodos.indexOf(todo)]"></TodoItem>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-sheet>
    </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Todo } from '@/types/todo';
import TodoItem from '../todo/TodoItem.vue';

const mockTodos = ref<Array<Todo>>([{
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: "2026-03-27",
    tags: [],
    isDone: false
}, {
    id: 2,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "medium",
    deadline: "2026-03-27",
    tags: [],
    isDone: false
}])
const tab = ref<string>('open')
</script>