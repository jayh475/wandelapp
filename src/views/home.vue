<template>
  <div class="container">
    <dynamic-header
      :title="'Welcome, ' + userStore.name"
      backgroundColor="white"
      color="black"
    ></dynamic-header>

    <h1>Friends | Recent activities</h1>

    <h1>My Agenda</h1>
    <div class="horizontal-scroll-wrapper">
      <ul
        style="
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          place-items: center;
          justify-content: space-between;
        "
      >
        <template
          v-for="[docKey, date] in upComingWalks"
          :key="docKey"
          :index="docKey"
        >
          <div class="data-holder">
            <h2 style="font-size: 30px; margin: 0">
              {{ unixToDateNumber(date) }}
            </h2>
            <h2 style="font-size: 25px; margin: 0">{{ unixToMonth(date) }}</h2>
            <button @click="goToCreatedWalk(docKey)" class="watch">
              watch
            </button>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import DynamicHeader from "../components/DynamicHeader.vue";
import { useUserStore } from "../store/auth-store";
import { getMyUpcomingDates, getMyWalk } from "../store/user-firestore";
import { unixToMonth, unixToDateNumber } from "../controllers/homeController";
import { goToCreatedWalk } from "../router/goToRouteWithParam";
export default {
  components: {
    DynamicHeader,
  },
  setup() {
    const userStore = useUserStore();
    const uid = userStore.getUID;
    let upComingWalks = ref<any | null>(null);
    onMounted(async () => {
      const walking = await getMyUpcomingDates(uid);
      upComingWalks.value = walking;
      console.log(walking);
      console.log(upComingWalks);
    });
    return {
      upComingWalks,
      userStore,
      unixToMonth,
      unixToDateNumber,
      goToCreatedWalk,
      getMyWalk,
    };
  },
};
</script>

<style scoped>
.container {
  height: 92.29vh;
  background: #2a2e43;
}
h1 {
  color: white;
  margin-left: 15%;
}
.horizontal-scroll-wrapper {
  height: 180px;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: rgb(203, 195, 195);
  width: 90%;
  margin-left: 10%;
}
.horizontal-scroll-wrapper1 {
  height: 180px;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: none;
  width: 90%;
  margin-left: 10%;
}
.data-holder {
  height: 150px;
  background-color: white;
  width: 100px;
  padding-left: 30px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
}
.watch:hover {
  background: #eee;
}
.watch {
  border: none;
  background-color: inherit;
  margin-bottom: 10px;
  font-size: 15px;
  text-decoration: underline;
}
</style>
