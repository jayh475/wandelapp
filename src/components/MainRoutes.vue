<template>
  <nav-bar></nav-bar>
  <!-- <suspense> -->
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
  <!-- </suspense> -->
  <menu-bar />
</template>

<script lang="ts">
import NavBar from "./Navbar.vue";
import MenuBar from "../components/MenuBar.vue";
import { NMessageProvider } from "naive-ui";

export default {
  setup() {
    return {};
  },
  components: { NavBar, MenuBar, NMessageProvider },
};
</script>

<style></style>
