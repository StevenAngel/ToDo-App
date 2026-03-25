<template>
  <v-app>
    <DashboardNav />
    <v-main>
      <DashboardDisplay />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import DashboardNav from '@/components/dashboard/DashboardNavigation.vue'
import DashboardDisplay from './components/dashboard/DashboardDisplay.vue';
</script>
