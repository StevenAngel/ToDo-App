<template>
  <v-app>
    <v-layout>
      <Navbar />
      <router-view></router-view>
    </v-layout>

  </v-app>
</template>

<script lang="ts" setup>
import Navbar from './components/ui/Navbar.vue';
</script>
