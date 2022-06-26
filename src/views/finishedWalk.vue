<template>
  <div class="container">
    <div class="item-box item-box-1">
      <dynamic-header
        title="Finished 🏁"
        backgroundColor="#2a2e43"
      ></dynamic-header>
    </div>
    <div class="item-box item-box-2">
      <div class="item-box-2_text">
        <p>{{ walkTitle }}</p>
      </div>
      <div class="item-box-2_button">
        <div>
          <n-button
            color="#2a2e43"
            type="primary"
            size="large"
            id="back"
            @click="back"
          >
            <p>Back</p>
          </n-button>
        </div>
      </div>
    </div>
    <div class="item-box item-box-3">
      <the-mapbox :cordinatess="coordinates"></the-mapbox>
    </div>
    <div class="item-box item-box-4">
      <div class="item-box-4_text">
        <p><strong> Location: </strong> {{ location }}</p>
        <p><strong> Started: </strong> {{ startTime }}</p>
        <p><strong> Ended: </strong> {{ endTime }}</p>
      </div>
      <div class="item-box-4_buttons">
        <n-button color="#2a2e43" type="primary" size="large" id="download">
          <p>Download</p>
        </n-button>
        <n-button color="#2a2e43" type="primary" size="large" id="share">
          <p>Share</p>
        </n-button>
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import TheMapbox from "../components/GPS Tracker/TheMapbox.vue";
import { NButton } from "naive-ui";
import router from "../router";
import DynamicHeader from "../components/DynamicHeader.vue";
import { onMounted, ref } from "vue";
import { useWalkingInfoStore } from "../store/WalkingInfoStore";
import { isProxy, toRaw } from "vue";
import { useUserStore } from "../store/auth-store";
import { useRoute } from "vue-router";
import { getFinishedWalk } from "../store/user-firestore";
 
export default {
  components: {
    TheMapbox,
    NButton,
    DynamicHeader,
  },
  setup() {
    const routeName = ref("Blockhoverpark");
    const walkingInfoStore = useWalkingInfoStore();
    const route = useRoute();
 
    // jayhs work
    let coordinates:any = ref([]);
    const startTime = ref();
    const endTime = ref();
 
 
    onMounted(async () => {
      const docIdWalk: any = route.params.wandelingID;
      let trip = await getFinishedWalk(docIdWalk);
      coordinates = JSON.parse(trip.coordinates);
      console.log(coordinates);
 
     
      startTime.value = trip.startTime;
      endTime.value = trip.endTime;
 
      walkingInfoStore.walks.push({
        startTime: startTime,
        endTime: endTime,
        coordinates: coordinates,
      });
    });

    //Remove proxy from coordinates
    const rawObject = toRaw(walkingInfoStore.walks[0].coordinates);
    coordinates = rawObject;
    console.log(rawObject);

 
    const back = () => {
      const walkId = route.params.wandelingID;
      console.log(walkId);
      router.push({
        name: "createdWalk",
        params: {
          name: useUserStore().getUsername,
          wandelingID: walkId,
        },
      });
    };
 
    return {
      routeName,
      endTime,
      startTime,
      coordinates,
      back,
    };
  },
};
</script>
 
<style scoped>
p {
  margin: 0;
  padding: 0;
}
.container {
  width: 100vw;
  height: 92.29vh;
  display: flex;
  flex-direction: column;
  background: #efefef;
}
 
.item-box-2 {
  height: 100px;
  display: flex;
  align-items: center;
}
.item-box-2_text p {
  font-size: 30px;
  margin-left: 20px;
  font-weight: 700;
}
.item-box-2_button {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
#back {
  width: 100px;
  margin-right: 20px;
}
#back p {
  font-weight: 700;
  font-size: 18px;
}
.item-box-3 {
  height: 400px;
}
.item-box-4 {
  display: flex;
  margin-top: 30px;
  height: 100px;
  justify-content: space-between;
}
.item-box-4 p {
  font-size: 18px;
}
 
.item-box-4_text {
  width: 700px;
  margin-left: 20px;
}
 
.item-box-4_buttons {
  width: 100%;
  text-align: end;
}
 
#share {
  margin-top: 5px;
  width: 110px;
  margin-right: 20px;
}
 
#download {
  width: 110px;
  margin-right: 20px;
}
</style>
 

