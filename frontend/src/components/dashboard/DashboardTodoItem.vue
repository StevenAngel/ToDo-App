<template>
    <v-list-item :class="[priorityClass, 'rounded-lg']" @click="todo.isDone = !todo.isDone">
        <template #prepend>
            <!-- click.stop stoppt den click, da wir schon auf dem list item den click handlen -->
            <v-checkbox-btn :model-value="todo.isDone" readonly></v-checkbox-btn>
        </template>
        <v-list-item-title :class="{ 'text-decoration-line-through': todo.isDone }">
            {{ todo.title }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="todo.description">{{ todo.description }}</v-list-item-subtitle>
        <template #append>
            <!-- div statt v-chip-group, da v-chip-group farbe aller child überschreibt. -->
            <!-- class display-flex und gap-2 (8px) -->
            <div class="d-flex ga-2">
                <v-chip v-if="todo.project" prepend-icon="mdi-folder" variant="outlined">
                    {{ todo.project }}
                </v-chip>
                <v-chip :color="priorityColor">
                    {{ todo.priority }}
                </v-chip>
                <v-chip v-if="todo.deadline" :color="todo.deadline && todo.deadline <= new Date() ? 'red' : ''">
                    {{ todo.deadline?.toLocaleDateString() }}
                </v-chip>
            </div>
        </template>
    </v-list-item>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Todo } from '@/types/todo';
import ProjectTodoItem from './TodoItem.vue';
const todo: Todo = {
    id: 1,
    title: "Todo Mock Title",
    description: "Todo Mock Description",
    priority: "low",
    deadline: new Date("2026-03-27"),
    categories: [],
    isDone: false,
    project: "Mock Project"
}

const priorityColor = todo.priority == "low" ? "green" : todo.priority == "medium" ? "orange" : "red";
const priorityClass = computed(() => "priority-" + priorityColor)


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


<style scoped>
.priority-green {
    border: 4px solid rgb(var(--v-theme-success))
}

.priority-orange {
    border: 4px solid rgb(var(--v-theme-warning))
}

.priority-red {
    border: 4px solid rgb(var(--v-theme-error))
}
</style>