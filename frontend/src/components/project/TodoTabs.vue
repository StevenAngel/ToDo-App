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
                    <!-- SORT TODOS -->
                    <v-select label="Sort" v-model="sortBy" :items="['Priority', 'Deadline', 'Tag']"
                        class="ml-auto" width="150" hide-details>
                    </v-select>
                    <!-- SORT CONTAINER -->
                    <OutlinedContainer v-for="value in sortedContainers" :label="value">
                        <!-- DASHBOARD ITEM -->
                        <TodoItem v-for="item in filterItems(value).filter(value => !value.isDone)" v-model="todos[todos.indexOf(item)]" />
                    </OutlinedContainer>
                    <!-- <TodoItem v-for="todo in todos.filter(value => !value.isDone)" v-model="todos[todos.indexOf(todo)]"> -->
                    <!-- </TodoItem> -->
                </v-tabs-window-item>
                <v-tabs-window-item value="done" class="pa-2 d-flex flex-column ga-2">
                    <TodoItem v-for="todo in todos.filter(value => value.isDone)" v-model="todos[todos.indexOf(todo)]">
                    </TodoItem>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-sheet>
    </v-container>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Todo } from '@/types/todo';
import TodoItem from '../todo/TodoItem.vue';
import OutlinedContainer from '../ui/OutlinedContainer.vue';
const todos = defineModel<Array<Todo>>({ required: true });
const tab = ref<string>('open')
const sortBy = ref<string>('Priority');
const sortedContainers = computed<Array<string>>(() => {
    switch (sortBy.value) {
        case 'Priority':
            return ['high', 'medium', 'low'];
        case 'Deadline':
            const deadlines: Array<string> = [];
            todos.value.forEach((element: Todo) => {
                if (element.deadline) {
                    if (!deadlines.includes(element.deadline)) deadlines.push(element.deadline);
                }
            });

            deadlines.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
            deadlines.push('No Deadline');
            return deadlines;
        case 'Tag':
            const tags: Array<string> = [];
            todos.value.forEach((element: Todo) => {
                element.tags.forEach((tag: string) => {
                    if (!tags.includes(tag)) tags.push(tag);
                });
            });

            tags.push("No Tags");
            return tags;
        default:
            return [];
    }
})

const filterItems = (containerValue: string): Array<Todo> => {
    switch (sortBy.value) {
        case 'Priority':
            return todos.value.filter((item: Todo) => item.priority == containerValue);
        case 'Deadline':
            if (containerValue == "No Deadline") {
                return todos.value.filter((item: Todo) => item.deadline == undefined);
            } else {
                return todos.value.filter((item: Todo) => item.deadline == containerValue);
            }
        case 'Tag':
            if (containerValue == "No Tags") {
                return todos.value.filter((item: Todo) => item.tags.length == 0);
            } else {
                return todos.value.filter((item: Todo) => item.tags.some(tag => containerValue.includes(tag)));
            }
        default:
            return todos.value;
    }
}
</script>