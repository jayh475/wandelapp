<template>
  <reload-prompt />
  <router-view />
</template>

<script lang="ts">
import ReloadPrompt from "./components/ReloadPrompt.vue";

export default {
  name: "app",
  components: {
    ReloadPrompt,
  },
};
</script>

<style>
/* .app {
  background: #2a2e43;
  min-height: 100vh;
  margin: 0;
} */

body {
  height: 100vh;
  margin: 0;
}
</style>
