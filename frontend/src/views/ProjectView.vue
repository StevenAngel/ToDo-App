<template>
  <v-main>
    <ProjectInfo v-if="project" v-model="project" />
    <AddTodoCard @created="loadTodos()" />
    <TodoTabs v-model="todos" />
  </v-main>
</template>

<script lang="ts" setup>
import ProjectInfo from '@/components/project/ProjectInfo.vue';
import AddTodoCard from '@/components/project/AddTodoCard.vue';
import TodoTabs from '@/components/project/TodoTabs.vue';
import { todoApi } from '@/api/todos';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Todo } from '@/types/todo';
import type { Project } from '@/types/project';
import { projectApi } from '@/api/projects';

const route = useRoute();
const todos = ref<Array<Todo>>([]);
const project = ref<Project | null>(null);

const loadProject = async () => {
  try {
    const projectResponse = await projectApi.getById(route.params.id.toString());
    project.value = projectResponse.data;
  } catch (e) {
    console.error(e);
  }
}

const loadTodos = async () => {
  try {
    const allTodos = await todoApi.getAll(route.params.id.toString());
    console.log(route.params.id.toString(), allTodos)
    todos.value = allTodos.data;
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  loadTodos();
  loadProject();
});
</script>
