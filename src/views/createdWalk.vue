<template>
  <dynamic-header
    :title="returnHeaderName()"
    backgroundColor="#2a2e43;"
    color="white"
  ></dynamic-header>

  <!--TODO make this a component file to also use in search walks -->

  <h1>{{ myWalk.title }}</h1>

  <div class="item-box-1">
    <div>
      <p>
        <strong>Organisator: </strong>
        <button
          @click="goToAProfile(myWalk.organisator, myWalk.uid)"
          class="profile-organisator"
        >
          {{ myWalk.organisator }}
        </button>
      </p>
      <p><strong>Location: </strong>{{ myWalk.location }}</p>
      <p><strong>Date: </strong>{{ myWalk.date }}</p>
      <p><strong>Start: </strong> {{ myWalk.time }}</p>
      <p><strong>Distance in km: </strong>{{ myWalk.distance }}</p>
      <p><strong>created on: </strong>{{ myWalk.created }}</p>
    </div>

    <div v-if="myUid === myWalk.uid" class="button-holder">
      <n-button style="background-color: #2a2e43; color: white">Back</n-button>
      <n-button type="warning" @click="startWalk">Start</n-button>
      <n-button type="error">Cancel</n-button>
    </div>
    <!-- participateInWalk(myUid, myName, myWalk.docId) -->
    <div v-if="myUid !== myWalk.uid" class="button-holder">
      <n-button
        @click="checkAndthenParticipateInWalk(myUid, myName, myWalk.docId)"
        style="background-color: #2a2e43; color: white"
        >Participate</n-button
      >

      <n-button style="background-color: #2a2e43; color: white">Back</n-button>
    </div>
  </div>

  <h2>Description:</h2>
  <div class="description-container">
    {{ myWalk.description }}
  </div>

  <div v-if="myUid === myWalk.uid">
    <h2>Requests:</h2>
    <div class="scrollDown">
      <template v-for="request in requests">
        <div class="request-wrapper">
          <p>
            {{ request.name }}
          </p>
          <button @click="acceptParticipant(request.uid, myWalk.docId)">
            <check-icon
              style="background-color: green; height: 40px"
            ></check-icon>
          </button>
          <button @click="() => {}">
            <cancel-icon
              style="background-color: red; height: 40px"
            ></cancel-icon>
          </button>
        </div>
      </template>
    </div>
  </div>

  <h2>Participants:</h2>
  <div style="margin-bottom: 2vh">
    <div class="scrollDown">
      <template v-for="participant in acceptedParticipants">
        <div class="participant-wrapper">
          <p>
            {{ participant.name }}
          </p>
        </div>
      </template>
    </div>
  </div>

  <n-button
    style="
      background-color: #2a2e43;
      color: white;
      margin-bottom: 10vh;
      width: 80vw;
    "
    >See walked route</n-button
  >
  <!-- <pre
    >{{ JSON.stringify(myWalk, null, 2) }}
</pre> -->
</template>

<script lang="ts">
import {
  CancelPresentationSharp as CancelIcon,
  CheckBoxSharp as CheckIcon,
} from "@vicons/material";
import DynamicHeader from "../components/DynamicHeader.vue";
import { ref, onMounted } from "vue";
import {
  getMyWalk,
  participateInWalk,
  getPendingParticipants,
  acceptParticipant,
  getAcceptedParticipants,
} from "../store/user-firestore";
import { useUserStore } from "../store/auth-store";
import { useRoute } from "vue-router";
import { NButton, useMessage } from "naive-ui";
import { unixToTime, unixToDate } from "../controllers/createWalkControlle";
import { goToAProfile } from "../router/goToRouteWithParam";
import router from "../router";

export default {
  components: {
    DynamicHeader,
    NButton,
    CancelIcon,
    CheckIcon,
    useMessage,
  },
  setup() {
    const message = useMessage();
    const userStore = useUserStore();
    const myUid = userStore.getUID;
    const myName = userStore.getUsername;

    // let myWalk = ref<any | null>(null);
    const myWalk = ref({
      title: null,
      organisator: null,
      location: null,
      distance: null,
      time: null,
      date: null,
      description: null,
      uid: null,
      docId: null,
      created: null,
    });

    const requests = ref([]);
    let acceptedParticipants = ref([]);

    const route = useRoute();

    onMounted(async () => {
      console.log(route.params.wandelingID);
      const walk = await getMyWalk(route.params.wandelingID);
      const request = await getPendingParticipants(route.params.wandelingID);
      const participants = await getAcceptedParticipants(
        route.params.wandelingID
      );

      myWalk.value.title = walk.data.title;
      myWalk.value.organisator = walk.data.organisator;
      myWalk.value.location = walk.data.location;
      myWalk.value.distance = walk.data.distance;
      myWalk.value.time = unixToTime(walk.data.time);
      myWalk.value.date = unixToDate(walk.data.date);
      myWalk.value.description = walk.data.description;
      myWalk.value.uid = walk.data.uid;
      myWalk.value.docId = walk.docId;
      myWalk.value.created = unixToDate(walk.data.created);

      requests.value = request;
      acceptedParticipants.value = participants;
    });

    const returnHeaderName = () => {
      if (myUid === myWalk.value.uid) {
        return "Created Walk";
      } else {
        return myWalk.value.organisator + "'s walk";
      }
    };

    const startWalk = () => {
      const wandelingID = route.params.wandelingID;
      router.push({ name: "walking", params: { wandelingID: wandelingID } });
    };
    // moet verhuisd worden naar een controller
    const checkAndthenParticipateInWalk = (
      myUid: string,
      myName: string,
      docId: any
    ) => {
      let list: Array<string> = [];

      if (requests.value.length !== 0) {
        requests.value.forEach((value) => {
          list.push(value.uid);
          console.log(list);
        });
      }
      if (acceptedParticipants.value.length !== 0) {
        acceptedParticipants.value.forEach((value) => {
          console.log("je moedder");
          console.log(value.uid);
          list.push(value.uid);
        });
      }
      if (!list.some((item) => item === myUid)) {
        participateInWalk(myUid, myName, docId);
        message.success("succesfully committed application");
      } else {
        message.error("still waiting for organisator to respond");
      }
    };

    return {
      myWalk,
      myUid,
      returnHeaderName,
      goToAProfile,
      participateInWalk,
      startWalk,
      myName,
      requests,
      acceptParticipant,
      acceptedParticipants,
      checkAndthenParticipateInWalk,
    };
  },
};
</script>

<style scoped>
.createWalk {
  /* margin: 10px; */
  background: #303446;
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
  color: white;
  font-size: 18px;
}

.backBtn {
  background: #303446;
  margin-right: 5%;
  color: white;
  height: 40px;
  width: 100px;
  border-radius: 15px;
  font-size: 16px;
}

h1 h2 {
  margin-left: 25px;
}
.item-box-1 {
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
}

p,
b {
  font-size: 18px;
  margin: 0;
}

h1,
h2 {
  margin-left: 10px;
}

.button-holder {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.description-container {
  margin-top: 15px;
  background-color: rgb(207, 200, 200);
  height: auto;
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  padding: 20px;
  justify-content: center;
  font-size: 16px;
}

.profile-organisator {
  border: none;
  background-color: inherit;
  margin-bottom: 10px;
  font-size: 15px;
  text-decoration: underline;
}
.scrollDown {
  overflow: scroll;
  height: 10vh;
  margin-bottom: 0.5vh;
}
.request-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  background: rgb(207, 200, 200);
  width: 60vw;
}

.participant-wrapper {
  margin-bottom: 10px;
  background: rgb(207, 200, 200);
  width: 80vw;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
