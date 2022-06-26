<template>
  <div class="container">
    <div class="item-box item-box-1">
      <dynamic-header
        title="Profile"
        backgroundColor="#2a2e43"
      ></dynamic-header>
    </div>

    <!-- someone else profile -->
    <div v-if="uid !== getUidFromList" class="item-box item-box-2">
      <div class="item-box-2_text">
        <p>{{ profile.name }}</p>
      </div>

      <div class="item-box-2_img">
        <div>
          <img src="../assets/work-in-progress.jpg" alt="" />
        </div>
      </div>
    </div>

    <!-- my own profile -->
    <div v-if="uid === getUidFromList" class="item-box item-box-2">
      <div class="item-box-2_text">
        <p>{{ userStore.name }}</p>
      </div>
      <div class="item-box-2_img">
        <div>
          <img :src="userStore.getPhotoURL" alt="" />
        </div>
      </div>
    </div>

    <div class="item-box item-box-3">
      <div class="item-box-3_text">
        <p><b>Telephone:</b> {{ userStore.phoneNumber }}</p>
        <p><b>E-mail:</b> {{ userStore.email }}</p>
      </div>

      <div class="item-box-3_button">
        <n-button
          v-if="uid !== getUidFromList"
          @click=""
          color="#2a2e43"
          type="primary"
          size="large"
          id="addFriend"
        >
          <p>
            Add <br />
            Friend
          </p>
        </n-button>
      </div>
    </div>
    <div class="item-box item-box-4">
      <p id="subHeader">Walk history:</p>
      <div class="scrollDown">
        <div v-for="route in walkedRoutes" :key="route.routeName">
          <walked-route-card :route="route"></walked-route-card>
        </div>
        <!-- <walked-route-card></walked-route-card>
          <walked-route-card></walked-route-card> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WalkedRouteCard from "../components/WalkedRouteCard.vue";
import { NButton } from "naive-ui";
import DynamicHeader from "../components/DynamicHeader.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/auth-store";
import {
  getAProfileHistoryWalks,
  getProfileDetails,
} from "../store/user-firestore";
import { useRoute } from "vue-router";

export default {
  components: {
    NButton,
    DynamicHeader,
    WalkedRouteCard,
  },
  setup() {
    const userStore = useUserStore();
    const uid = userStore.getUID;
    const getUidFromList = ref();

    const route = useRoute();
    const walkedRoutes = ref([]);
    const profile = ref({});
    // const walk = await getMyWalk(route.params.wandelingID);

    onMounted(async () => {
      console.log(route.params.uid);
      let walked = await getAProfileHistoryWalks(route.params.uid);
      let profileDetails = await getProfileDetails(route.params.uid);

      console.log(profileDetails);

      walkedRoutes.value = walked;
      profile.value = profileDetails;

      getUidFromList.value = profileDetails.userID;
    });

    return {
      walkedRoutes,
      userStore,
      uid,
      getUidFromList,
      profile,
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
  margin-top: 50px;
}

.item-box-2_text {
  width: 100%;
}

.item-box-2_text p {
  font-size: 30px;
  margin-left: 20px;
  font-weight: 700;
}

.item-box-2_img {
  align-items: center;
  margin-right: 15px;
}

.item-box-2_img img {
  width: 100px;
  border-radius: 50%;
  border: gray solid 3px;
}

.item-box-3 {
  height: 100px;
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
}

.item-box-3_text {
  width: 100%;
}

.item-box-3_text p {
  font-size: 16px;
  margin-left: 20px;
  font-weight: 700;
}

#addFriend {
  width: 100px;
  height: 70px;
  margin-right: 20px;
  border-radius: 20px;
}

#addFriend p {
  font-weight: 700;
  font-size: 18px;
}

.item-box-4 {
  margin-top: 30px;
  /* height: 100px; */
  display: flex;
  flex-direction: column;
}

#subHeader {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 700;
}

.scrollDown {
  overflow: scroll;
  height: 330px;
}
</style>
