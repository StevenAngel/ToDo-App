<template>
    <v-container>
        <v-sheet class="pa-4 rounded">
            <v-form>
                <v-row>
                    <v-col cols="8">
                        <v-text-field label="New Todo Name"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-btn>Add Todo</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8">
                        <v-combobox v-model="tags" chips multiple closable-chips label="Tags eingeben"
                            hint="Enter drücken um Tag hinzuzufügen"></v-combobox>
                    </v-col>
                    <v-col cols="4">
                        <p class="ma-0">Priority</p>
                        <v-chip-group mandatory v-model="selectedPriority">
                            <v-chip value="low">low</v-chip>
                            <v-chip value="medium">medium</v-chip>
                            <v-chip value="high">high</v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>

                <v-date-picker title=""></v-date-picker>
            </v-form>
        </v-sheet>
    </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const tags = ref<Array<string>>([])
const selectedPriority = ref<string>('low')
</script>
<style scoped></style>