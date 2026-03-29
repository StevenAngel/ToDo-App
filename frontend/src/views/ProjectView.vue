<template>
  <v-main>
    <AddTodoCard @created="loadTodos()" />
    <TodoTabs v-model="todos" />
  </v-main>
</template>

<script lang="ts" setup>
import AddTodoCard from '@/components/project/AddTodoCard.vue';
import TodoTabs from '@/components/project/TodoTabs.vue';
import { todoApi } from '@/api/todos';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Todo } from '@/types/todo';

const route = useRoute();
const todos = ref<Array<Todo>>([]);

const loadTodos = async () => {
  try {
    const allTodos = await todoApi.getAll(route.params.id.toString());
    todos.value = allTodos.data;
  } catch (e) {
    console.error(e);
  }
}

onMounted(loadTodos);
</script>
