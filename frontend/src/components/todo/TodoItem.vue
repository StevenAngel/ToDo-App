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

                <v-dialog>
                    <!-- v-slot (#activator) ist das Element, dass den Dialog öffnen soll. Es legt für den v-dialog ein object props an. Es ist ein eventListener wie onClick.  -->
                    <template #activator="{ props }">
                        <!-- mit v-bind binde ich das object an den button, damit vuetify weiß, es muss den dialog onclick öffnen  -->
                        <v-btn variant="tonal" v-bind="props" @click.stop>
                            <v-icon :icon="'mdi-cog'" />
                        </v-btn>
                    </template>
                    <!-- isActive ist ebenfalls eine intern für den dialog angelegte Ref von vuetify, die den wert enthält, ob der dialog offen (true) oder geschlossen (false) ist -->
                    <template #default="{ isActive }">
                        <v-row justify="center">
                            <v-col cols="12" sm="12" md="9" lg="9">
                                <v-form @submit.prevent="updateTodoForm()">

                                    <v-card>
                                        <v-card-title class="text-wrap">
                                            Edit Todo
                                        </v-card-title>
                                        <v-container>
                                            <v-sheet class="pa-4 rounded">
                                                <!-- v-form zum validieren von allen inputs, .prevent zum verhindern vom neuladen der seite -->
                                                <v-row>
                                                    <v-col cols="9" class="d-flex flex-column ga-2">
                                                        <v-text-field label="Title" v-model="form.title"
                                                            hide-details="auto"></v-text-field>
                                                        <v-text-field label="Description" v-model="form.description"
                                                            hide-details="auto"></v-text-field>
                                                        <v-combobox v-model="form.tags" chips multiple closable-chips
                                                            label="Add Tags" hint="Press enter to add"
                                                            hide-details="auto"></v-combobox>
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
                                                                <v-text-field v-bind="props" v-model="dateString"
                                                                    label="Deadline" prepend-inner-icon="mdi-calendar"
                                                                    readonly hide-details="auto" clearable
                                                                    @click:clear="form.deadline = undefined" />
                                                            </template>
                                                            <v-date-picker v-model="form.deadline" :min="new Date()"
                                                                @update:model-value="dateOpen = false" />
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                            </v-sheet>
                                        </v-container>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="isActive.value = false" type="submit"
                                                color="green">Save</v-btn>
                                            <v-btn @click="isActive.value = false">Cancel</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-form>
                            </v-col>
                        </v-row>
                    </template>
                </v-dialog>
            </div>
        </template>
    </v-list-item>
</template>
<script lang="ts" setup>
import type { Todo, UpdateTodo } from '@/types/todo';
import { computed, watch, ref, type Ref } from 'vue';
import { todoApi } from '@/api/todos';
// required: true, damit error geworfen wird, wenn kein v-model im parent angegeben
const todo: Ref<Todo> = defineModel<Todo>({ required: true });
const dateOpen = ref<boolean>(false);
const priorityColor = computed(() => todo.value.priority == "low" ? "green" : todo.value.priority == "medium" ? "orange" : "red");
const priorityClass = computed(() => "priority-" + priorityColor.value);
const dateString = computed<string | undefined>(() => {
    if (form.value.deadline) {
        return new Date(form.value.deadline).toLocaleDateString()
    }

    return undefined;
});

const form = ref<UpdateTodo>({
    title: todo.value.title,
    description: todo.value.description,
    priority: todo.value.priority,
    deadline: todo.value.deadline,
    tags: todo.value.tags,
    isDone: todo.value.isDone
});

const updatedTodo = ref<UpdateTodo>({
    title: todo.value.title,
    description: todo.value.description,
    priority: todo.value.priority,
    deadline: todo.value.deadline,
    tags: todo.value.tags,
    isDone: todo.value.isDone
});

watch(() => todo.value.isDone, async (newValue, oldValue) => {
    console.log(newValue, oldValue);
    // Only update isDone, other values will be updated in form
    if (newValue != oldValue) {
        updatedTodo.value.isDone = newValue;
        await updateTodo();
    }
})

const updateTodoForm = async () => {
    updatedTodo.value = form.value;
    await updateTodo();
}

const updateTodo = async () => {
    try {
        const entry = await todoApi.update(todo.value.id.toString(), updatedTodo.value);
        if (entry.status == 200) {
            todo.value = {
                id: todo.value.id,
                title: updatedTodo.value.title,
                description: updatedTodo.value.description,
                deadline: updatedTodo.value.deadline,
                isDone: updatedTodo.value.isDone,
                priority: updatedTodo.value.priority,
                tags: updatedTodo.value.tags,
                projectId: todo.value.projectId
            }
        }
    } catch (e) {
        console.error(e);
    }
}
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