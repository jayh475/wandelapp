<template id="page-container">
  <div class="navigation" id="menu">
    <ul>
      <li
        class="list"
        @click="(activeBtn = 'home'), gotoHomePage()"
        :class="{ active: activeBtn === 'home' }"
      >
        <a href="#">
          <span class="icon" style="--clr: #f44336">
            <n-icon size="35">
              <home-outline />
            </n-icon>
          </span>
        </a>
      </li>
      <li
        class="list"
        @click="(activeBtn = 'my-walks'), goToMyWalksPage()"
        :class="{ active: activeBtn === 'my-walks' }"
      >
        <a href="#">
          <span class="icon" style="--clr: #ffa117">
            <n-icon size="35">
              <map-outline />
            </n-icon>
          </span>
        </a>
      </li>
      <li
        class="list"
        @click="(activeBtn = 'search-walks'), gotoWalks()"
        :class="{ active: activeBtn === 'search-walks' }"
      >
        <a href="#">
          <span class="icon" style="--clr: #2196f3">
            <n-icon size="35">
              <search />
            </n-icon>
          </span>
        </a>
      </li>
      <div class="indicator"></div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NIcon } from "naive-ui";
import { Search, HomeOutline, MapOutline } from "@vicons/ionicons5";
import { goToMyWalks, goToHome } from "../router/goToRouteWithParam";
import router from "../router";

let activeBtn = ref();
let goToMyWalksPage = ref(goToMyWalks);
let gotoHomePage = ref(goToHome);
let gotoWalks = () => {
  router.push({ path: "/wandelapp/walks" });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#page-container {
  position: relative;
  min-height: 100vh;
}

#menu {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.navigation {
  position: relative;
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.navigation ul {
  display: flex;
}
.navigation ul li {
  list-style: none;
  position: relative;
  /* 350 / 5 = 70 */
  width: 70px;
  height: 60px;
  z-index: 2;
}
.navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.navigation ul li a .icon {
  position: relative;
  display: block;
  line-height: 65px;
  font-size: 1.5em;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  transition: 0.5s;
  transition-delay: 0s;
  color: #222327;
}
.navigation ul li.active a .icon {
  transform: translateY(-10px);
  color: #fff;
  transition-delay: 0.25s;
  background: var(--clr);
}

.navigation ul li a .icon::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  transition-delay: 0s;
  border-radius: 50%;
  background: var(--clr);
  filter: blur(5px);
  opacity: 0;
}
.navigation ul li.active a .icon::before {
  transition-delay: 0.5s;
  opacity: 0.5;
}

.indicator {
  position: absolute;
  top: -15px;
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  z-index: 1;
  transition: 0.5s;
  
}


.indicator::before {
  content: "";
  position: absolute;
  top: 5px;
  left: -28px;
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 15px 18px #fff;
}
.indicator::after {
  content: "";
  position: absolute;
  top: 5px;
  right: -28px;
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 50%;
  box-shadow: -15px 18px #fff;
}


.navigation ul li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(70px * 0));
}
.navigation ul li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(70px * 1));
}
.navigation ul li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(70px * 2));
}
</style>


