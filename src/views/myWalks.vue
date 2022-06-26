<template>
  <dynamic-header
    title="My future Walks"
    backgroundColor="#2a2e43;"
    color="white"
  ></dynamic-header>

  <button class="createWalk" @click="goToCreateWalk()">Create new walk</button>

  <h1>My Created Walks:</h1>
  <div class="scrollDown">
    <div v-for="[docKey, route] in walkedRoutes" :key="route.title">
      <walked-route-card :route="route" :docKey="docKey"></walked-route-card>
    </div>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from "vue";
import DynamicHeader from "../components/DynamicHeader.vue";
import { useUserStore } from "../store/auth-store";
import WalkedRouteCard from "../components/WalkedRouteCard.vue";
import { onMounted, ref } from "vue";
import { goToCreateWalk } from "../router/goToRouteWithParam";
import { getWalks } from "../store/user-firestore";
// https://antfu.me/posts/async-with-composition-api
export default {
  components: {
    DynamicHeader,
    WalkedRouteCard,
  },
  setup() {
    const userStore = useUserStore();
    const uid = userStore.getUID;
    // const walkedRoutes = ref([]);
    let walkedRoutes = ref<any | null>(null);

    onMounted(async () => {
      const walks = await getWalks(uid);

      walkedRoutes.value = walks;
    });

    return {
      userStore,
      walkedRoutes,
      goToCreateWalk,
      uid,
    };
  },
  methods: {},
};
</script>

<style scoped>
.container {
  height: 92.29vh;
  background: #2a2e43;
}

.createWalk {
  /* margin: 10px; */
  background: #303446;
  margin-top: 5%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
  color: white;
  font-size: 18px;
}
h1 {
  margin-left: 10%;
}
.scrollDown {
  overflow: scroll;
  height: 70vh;
}
</style>
