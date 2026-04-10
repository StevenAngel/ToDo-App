<template>
    <v-list-item :class="[priorityClass, 'rounded-lg']" @click.stop="todo.isDone = !todo.isDone">
        <template #prepend>
            <!-- click.stop stoppt den click, da wir schon auf dem list item den click handlen -->
            <v-checkbox-btn :model-value="todo.isDone" readonly></v-checkbox-btn>
        </template>
        <div class="d-flex align-center ga-2">
            <div>
                <v-list-item-title :class="{ 'text-decoration-line-through': todo.isDone }">{{ todo.title
                    }}</v-list-item-title>
                <v-list-item-subtitle v-if="todo.description">{{ todo.description }}</v-list-item-subtitle>
            </div>
            <div v-if="todo.tags" class="d-flex ga-2">
                <v-chip v-for="tag in todo.tags" variant="outlined">{{ tag }}</v-chip>
            </div>
        </div>
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
                <v-chip v-if="todo.deadline"
                    :color="todo.deadline && new Date(todo.deadline) <= new Date() ? 'red' : ''">
                    {{ new Date(todo.deadline).toLocaleDateString() }}
                </v-chip>
                <v-btn variant="tonal" @click.stop="console.log('test')">
                    <v-icon :icon="'mdi-cog'" />
                </v-btn>
            </div>
        </template>
    </v-list-item>
</template>
<script lang="ts" setup>
import type { Todo, UpdateTodo } from '@/types/todo';
import { computed, watch, type Ref } from 'vue';
import { todoApi } from '@/api/todos';
// required: true, damit error geworfen wird, wenn kein v-model im parent angegeben
const todo: Ref<Todo> = defineModel<Todo>({ required: true });
const priorityColor = computed(() => todo.value.priority == "low" ? "green" : todo.value.priority == "medium" ? "orange" : "red");
const priorityClass = computed(() => "priority-" + priorityColor.value);

watch(todo.value, async (newValue,) => {
    const updateTodo: UpdateTodo = {
        title: newValue.title,
        description: newValue.description,
        priority: newValue.priority,
        deadline: newValue.deadline,
        tags: newValue.tags,
        isDone: newValue.isDone
    }

    try {
        await todoApi.update(newValue.id.toString(), updateTodo);
    } catch (e) {
        console.error(e);
    }
})
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