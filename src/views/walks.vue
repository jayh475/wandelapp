<template>
  <dynamic-header
    title="Search Walks"
    backgroundColor="#2a2e43;"
    color="white"
  ></dynamic-header>

  <div class="scrollDown">
    <div v-for="[docKey, route] in allWalks" :key="route.title">
      <walked-route-card :route="route" :docKey="docKey"></walked-route-card>
    </div>
  </div>

</template>

<script lang="ts">
import DynamicHeader from "../components/DynamicHeader.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/auth-store";
import WalkedRouteCard from "../components/WalkedRouteCard.vue";
import { getAllUpComingWalks } from "../store/user-firestore";

export default {
  components: {
    DynamicHeader,
    WalkedRouteCard,
  },
  setup() {
    const userStore = useUserStore();
    const allWalks = ref<any | null>(null);

    onMounted(async () => {
      const walks = await getAllUpComingWalks();
      allWalks.value = walks;
      allWalks.value.forEach((value: any, key: any) => {
        console.log(key + " = " + value.organisator);
      });
    });

    return {
      allWalks,
    };
  },
};
</script>

<style scoped>
.createWalk {
  background: #303446;
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
  color: white;
  font-size: 18px;
}



.scrollDown {
  overflow: scroll;
  height: 70vh;
}
</style>
