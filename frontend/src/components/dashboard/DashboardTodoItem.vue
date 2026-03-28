<template>
<ProjectTodoItem v-for="(item, index) in mockTodos" v-model="mockTodos[index]"/>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Todo } from '@/types/todo';
import ProjectTodoItem from './ProjectTodoItem.vue';
const mockTodos = ref<Array<Todo>>([{
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: new Date("2026-03-27"),
    categories: [],
    isDone: false
}, {
    id: 2,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "medium",
    deadline: new Date("2026-03-27"),
    categories: [],
    isDone: false
}])
</script>