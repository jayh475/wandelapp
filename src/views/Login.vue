<template>
  <div class="container">
    <h1 class="title">
      WALK <br />
      BUDDY.
    </h1>
    <img alt="Jogging girl" src="../assets/jogging.png" />
    <p>
      A beginner to exercise should start <br />
      with brisk walking, progress to jogging<br />
      and work up to running.
    </p>

    <n-button
      @click=""
      class="n-button"
      size="large"
      :block="true"
      color="#5275a8"
    >
      <template #icon>
        <n-icon> <logo-facebook /> </n-icon>
      </template>
      Login with Facebook
    </n-button>

    <n-button
      @click="loginOrRegisterWithGoogle()"
      size="large"
      :block="true"
      text-color="#6b6b6b"
      color="#ffffff"
    >
      <template #icon>
        <n-icon> <logo-chrome></logo-chrome> </n-icon>
      </template>
      Login with Gmail
    </n-button>

    <p>Sign up with <a>email</a></p>

    <p>Already have an account? <a>Log in</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { NButton, NIcon } from "naive-ui";
import { LogoFacebook, LogoChrome } from "@vicons/ionicons5";
import { useUserStore } from "../store/auth-store";

export default defineComponent({
  components: {
    NButton,
    NIcon,
    LogoFacebook,
    LogoChrome,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    // https://pinia.vuejs.org/core-concepts/actions.html#usage-with-the-options-api (pina examples)
    loginOrRegisterWithGoogle() {
      this.userStore.registerOrLoginWithGoogle();
    },
  },
});
</script>

<style scoped>
.title {
  width: 30%;
  margin: auto;
  color: white;
  margin-bottom: 20px;
  padding-top: 10px;
  font-size: 2rem;
}

img {
  max-width: 100%;
  height: auto;
}

p {
  text-align: center;
  width: 70%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
  font-size: medium;
}

.n-button {
  width: 50%;
  margin: auto;
  margin-top: 15px;
}

a {
  text-decoration: underline;
  color: orange;
}

.container {
  height: 100vh;
  background: #2a2e43;
}
</style>
