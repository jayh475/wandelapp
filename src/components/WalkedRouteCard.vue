<template>
  <div class="card">
    <div class="card-map">
      <img src="../assets/kaart.png" alt="" />
    </div>
    <div class="card-information">
      <div class="card-information_text">
        <p>
          <b>{{ route.title }}</b>
        </p>
        <div class="info">
          <p><b>Organisator:</b> {{ route.organisator }}</p>
          <p><b>Location:</b> {{ route.location }}</p>
          <p>
            <b>Date:</b> {{ unixToDate(route.date) }},
            {{ unixToTime(route.time) }}
          </p>
        </div>
      </div>
      <div class="card-information_button">
        <n-button
          @click="goToWalk(docKey, route.organisator)"
          color="#2a2e43"
          type="primary"
          size="large"
          id="watch"
        >
          <p>Watch</p>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NButton } from "naive-ui";
import { onMounted } from "vue";
import { unixToTime, unixToDate } from "../controllers/createWalkControlle";
import { goToWalk } from "../router/goToRouteWithParam";

export default {
  props: {
    route: Object,
    docKey: String,
  },
  components: {
    NButton,
  },
  setup() {
    return {
      unixToDate,
      unixToTime,
      goToWalk,
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  width: 90%;
  height: 135px;
  /* background: red;         */
  margin: 15px 0 0 20px;
  border-radius: 20px;
  box-shadow: 5px 2px 14px black;
  flex-direction: column;
  overflow: hidden;
}

.card-map {
  background: orange;
  height: 55px;
  width: 100%;
}

.card-map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-information {
  display: flex;
  background: rgb(149, 149, 149);
  width: 100%;
  height: 80px;
}
.card-information_text {
  width: 280px;
}

.card-information_text p {
  font-size: 20px;
  margin: 0 0 0 20px;
}

.info p {
  font-size: 15px;
  line-height: 15px;
}

.card-information_button {
  align-self: center;
  justify-self: flex-end;
}

#watch {
  border-radius: 10px;
}
</style>
