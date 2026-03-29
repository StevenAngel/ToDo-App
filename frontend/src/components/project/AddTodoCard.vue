<template>
    <v-container>
        <v-sheet class="pa-4 rounded">
            <!-- v-form zum validieren von allen inputs, .prevent zum verhindern vom neuladen der seite -->
            <v-form @submit.prevent="createTodo()">
                <v-row>
                    <v-col cols="9" class="d-flex flex-column ga-2">
                        <v-text-field label="Title" :rules="[rules.required]" v-model="form.title"
                            hide-details="auto"></v-text-field>
                        <v-text-field label="Description" v-model="form.description" hide-details="auto"></v-text-field>
                        <v-combobox v-model="form.tags" chips multiple closable-chips label="Add Tags"
                            hint="Press enter to add" hide-details="auto"></v-combobox>
                    </v-col>
                    <v-col cols="3" class="d-flex flex-column ga-2">
                        <p class="ma-0">Priority</p>
                        <v-chip-group mandatory v-model="form.priority" class="pa-0">
                            <v-chip value="low" color="green">low</v-chip>
                            <v-chip value="medium" color="orange">medium</v-chip>
                            <v-chip value="high" color="red">high</v-chip>
                        </v-chip-group>
                        <v-menu v-model="dateOpen" :close-on-content-click="false">
                            <template #activator="{ props }">
                                <v-text-field v-bind="props" v-model="dateString" label="Deadline"
                                    prepend-inner-icon="mdi-calendar" readonly hide-details="auto" clearable
                                    @click:clear="form.deadline = undefined" />
                            </template>
                            <v-date-picker v-model="form.deadline" :min="new Date()"
                                @update:model-value="dateOpen = false" />
                        </v-menu>
                        <v-btn type="submit" color="green" variant="tonal" class="w-100">Add
                            Todo</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-sheet>
        <v-snackbar v-model="createMessage.show" :timeout="5000" :color="createMessage.color">
            {{ createMessage.message }}
        </v-snackbar>
    </v-container>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { rules } from '@/utils/rules';
import type { CreateTodo } from '@/types/todo';
import { todoApi } from '@/api/todos';
import { useRoute } from 'vue-router';

const route = useRoute();
const emit = defineEmits(['created']);
const dateOpen = ref<boolean>(false);
const dateString = computed<string | undefined>(() => {
    if (form.value.deadline) {
        return new Date(form.value.deadline).toLocaleDateString()
    }

    return undefined;
});

const createMessage = ref({
    show: false,
    message: "Todo created successfully",
    color: "green"
});

const form = ref<CreateTodo>({
    title: '',
    description: '',
    priority: 'low',
    deadline: undefined,
    tags: [],
    projectId: route.params.id as number,
});

const createTodo = async () => {
    try {
        const todo = await todoApi.create(form.value);
        if (todo.status == 201) {
            createMessage.value.message = "Todo created successfully";
            createMessage.value.color = "green";
            createMessage.value.show = true;
            emit('created')
        }
    } catch (e) {
        console.error(e)
        createMessage.value.message = "Something went wrong, please try again";
        createMessage.value.color = "red";
        createMessage.value.show = true;
    }
}
</script>
<style scoped></style>