<template>
  <DashboardNav />
  <v-main>
    <DashboardDisplay />
  </v-main>
</template>

<script lang="ts" setup>
import DashboardNav from '@/components/dashboard/DashboardNavigation.vue';
import DashboardDisplay from '@/components/dashboard/DashboardDisplay.vue';
</script>
