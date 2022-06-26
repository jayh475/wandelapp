<template>
  <nav>
    <img alt=" logo walk-buddy" src="../assets/deWandelendeTakken.png" />
    <n-dropdown :options="options" @select="handleSelect">
      <img class="img2" alt="profile picture" :src="userStore.getPhotoURL" />
    </n-dropdown>

    <p>{{ userStore.getUsername }}</p>
  </nav>
</template>

<script lang="ts">
import { h, defineComponent } from "vue";
import type { Component } from "vue";
import { NIcon, NDropdown, NButton } from "naive-ui";
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  CloseOutline as Close,
} from "@vicons/ionicons5";
import { useUserStore } from "../store/auth-store";
import router from "../router";

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
export default defineComponent({
  components: {
    NButton,
    NIcon,
    NDropdown,
  },

  setup() {
    const userStore = useUserStore();
    const profileRoute =
      "/wandelapp/profile/" + userStore.getUsername + "/" + userStore.getUID;

    const logOut = () => {
      userStore.logOut();
    };
    const goToProfile = () => {
      router.push({ path: profileRoute });
    };

    const handleSelect = (key: string) => {
      console.log(key);
      if (key === "logOut") {
        logOut();
      }
      if (key === "profile") {
        goToProfile();
      }
    };

    return {
      options: [
        {
          label: "Profile",
          key: "profile",
          icon: renderIcon(UserIcon),
        },
        {
          label: "Edit Profile",
          key: "editProfile",
          icon: renderIcon(EditIcon),
        },
        {
          label: "Logout",
          key: "logOut",
          icon: renderIcon(LogoutIcon),
        },
        {
          label: "Close dropdown",
          key: "close",
          icon: renderIcon(Close),
        },
      ],
      userStore,
      handleSelect,
    };
  },
});
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;
  height: 70px;
  width: 100vw;
  background-color: #7b7b7b;
  margin-top: 0;
}
img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-left: 15px;
  margin-top: 10px;
  float: left;
}

.img2 {
  border-radius: 50%;
  /* height: auto; */
  width: 50px;
  float: right;
  margin-right: 15px;
  border: 2px solid #494949;
}

p {
  float: right;
  margin-top: 1.2rem;
  margin-right: 1rem;
  font-size: 20px;
}
</style>
