<template>
  <div class="container">
    <dynamic-header title="Walking" backgroundColor="#2a2e43"></dynamic-header>

    <div class="box-1">
      <n-button
        color="#2a2e43"
        type="primary"
        size="large"
        id="back"
        @click="back()"
      >
        <p>Back</p>
      </n-button>
    </div>

    <div class="box-2">
      <div class="circleOne">
        <div class="circleTwo">
          <div class="circleThree">
            <compass-outline
              class="compass"
              size="14"
              color="white"
              @click="startTimer"
            />
          </div>
        </div>
      </div>

      <div class="timer">
        <p>Time:</p>
        <p>{{ timer.time }}</p>
      </div>
    </div>

    <div class="box-3">
      <n-button
        color="#be6565"
        type="primary"
        size="large"
        id="stopWalk"
        @click="stopTimer"
      >
        <p>Stop walk</p>
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "@vue/runtime-core";
import { ref } from "vue";
import { NButton } from "naive-ui";
import DynamicHeader from "../components/DynamicHeader.vue";
import { CompassOutline } from "@vicons/ionicons5";
import gpsTracker from "../controllers/GpsTracker";
import { useWalkingInfoStore } from "../store/WalkingInfoStore";
import router from "../router";
import { useRoute } from "vue-router";
import { saveFinishedWalk } from "../store/user-firestore";
import { goToCreatedWalk } from "../router/goToRouteWithParam";
import { useUserStore } from "../store/auth-store";

export default {
  components: {
    NButton,
    DynamicHeader,
    CompassOutline,
    gpsTracker,
  },
  setup() {
    //TODO
    const route = useRoute();

    var timer: any = reactive({ time: "00:00:00" });
    var hr: any = 0;
    var min: any = 0;
    var sec: any = 0;
    var stoptime: any = true;
    var startTime: any = undefined;
    var endTime: any = undefined;
    var coordinates: any = [];
    // const useWalking = useWalkingInfoStore();
    const walkingInfoStore = useWalkingInfoStore();

    const startTimer = () => {
      if (stoptime == true) {
        startTime = Date();
        console.log(startTime);
        stoptime = false;
        gpsTracker(coordinates);
        timerCycle();
      }
    };

    const stopTimer = () => {
      if (stoptime == false) {
        endTime = Date();
        console.log(endTime);
        stoptime = true;

        // TODO fix firestore

        let walkId = route.params.wandelingID;

        saveFinishedWalk(coordinates, startTime, endTime, walkId);

        walkingInfoStore.walks.push({
          startTime: startTime,
          endTime: endTime,
          coordinates: coordinates,
        });
        router.push({ name: "finished", params: { wandelingID: walkId } });
      }
    };

    const timerCycle = () => {
      if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
          min = min + 1;
          sec = 0;
        }
        if (min == 60) {
          hr = hr + 1;
          min = 0;
          sec = 0;
        }

        if (sec < 10 || sec == 0) {
          sec = "0" + sec;
        }
        if (min < 10 || min == 0) {
          min = "0" + min;
        }
        if (hr < 10 || hr == 0) {
          hr = "0" + hr;
        }

        timer.time = hr + ":" + min + ":" + sec;
        setTimeout(timerCycle, 1000);
      }
    };

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
      //   goToCreatedWalk(walkId);
    };

    return {
      hr,
      min,
      sec,
      stoptime,
      timer,
      startTimer,
      stopTimer,
      timerCycle,
      back,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 92.29vh;
  display: flex;
  flex-direction: column;
  background: #efefef;
}
.box-1 {
  margin-top: 40px;
  align-self: flex-end;
}

#back {
  margin-right: 20px;
  width: 100px;
}

#back p {
  font-weight: 700;
  font-size: 18px;
}

.box-2 {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background: rgb(216, 214, 214);
  width: 73vw;
  height: 50vh;
  align-self: center;
  border-radius: 70px;
  align-items: center;
}

.circleOne {
  position: relative;
  margin-top: 50px;
  background: #cccfd4;
  width: 230px;
  height: 230px;
  border-radius: 50%;
}

.circleTwo {
  position: absolute;
  background: #9ca3b2;
  border-radius: 50%;
  width: 190px;
  height: 190px;
  margin: 20px 0px 0px 20px;
}

.circleThree {
  position: absolute;
  background: #273a5e;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  margin: 30px 0px 0px 30px;
}

.compass {
  height: 60px;
  margin-top: 35px;
  margin-left: 35px;
}

.box-3 {
  align-self: center;
}

.timer p {
  margin: 0;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}

.timer p:nth-child(2) {
  font-size: 40px;
  font-weight: 500;
}

#stopWalk {
  margin: 20px 0 0 0;
  width: 350px;
}

#stopWalk p {
  font-weight: 700;
  font-size: 18px;
}
</style>
