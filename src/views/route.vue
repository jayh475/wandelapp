<template>
  <div class="container">
    <div class="item-box item-box-1">
      <dynamic-header title="Route" backgroundColor="#2a2e43"></dynamic-header>
    </div>
    <div class="item-box item-box-2">
      <div class="item-box-2_text">
        <p>{{ routeName }}</p>
      </div>
      <div class="item-box-2_button">
        <div>
          <n-button color="#2a2e43" type="primary" size="large" id="back">
            <p>Back</p>
          </n-button>
        </div>
      </div>
    </div>
    <div class="item-box item-box-3">
      <the-mapbox :cordinatess="coordinates"></the-mapbox>
    </div>
    <div class="item-box item-box-4">
      <p>
        <strong>{{ name }}</strong> walked <strong>{{ distance }}</strong> on <strong>{{ date }}</strong>
      </p>
      <p><strong>Organisator:</strong> {{ organisator }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import TheMapbox from "../components/GPS Tracker/TheMapbox.vue";
import { NButton } from "naive-ui";
import DynamicHeader from "../components/DynamicHeader.vue";
import { ref } from "vue";

export default {
  components: {
    TheMapbox,
    NButton,
    DynamicHeader,
  },
  setup() {
    // Word vervangen door user info
    const routeName = ref("Blockhoverpark");
    const name = ref("Marlo");
    const distance = ref("2.3 Km");
    const date = ref("22 April");
    const organisator = ref("Jan de Boer");
    //   Tijdelijke cordinaten lijst

    const coordinates = [
      [5.62545, 52.05224],
      [5.62608, 52.05217],
      [5.62689, 52.05207],
      [5.62715, 52.05204],
      [5.62716, 52.05201],
      [5.62714, 52.05197],
      [5.62714, 52.05196],
      [5.62711, 52.05193],
      [5.62708, 52.0519],
      [5.62706, 52.05187],
      [5.62704, 52.05184],
      [5.62704, 52.0518],
      [5.62702, 52.0516],
      [5.62701, 52.05151],
      [5.62693, 52.05124],
      [5.62687, 52.05093],
      [5.62687, 52.05091],
      [5.62679, 52.05072],
      [5.62676, 52.05061],
      [5.62675, 52.05054],
      [5.62671, 52.05041],
      [5.62655, 52.04981],
      [5.62647, 52.04951],
      [5.62632, 52.04899],
      [5.62612, 52.04828],
      [5.62607, 52.0481],
      [5.62588, 52.04739],
      [5.6258, 52.04714],
      [5.62572, 52.04689],
      [5.6257, 52.04681],
      [5.62569, 52.04678],
      [5.6257, 52.04667],
      [5.62571, 52.04662],
      [5.62575, 52.04653],
      [5.62576, 52.04629],
      [5.62596, 52.04632],
      [5.62626, 52.04637],
      [5.62682, 52.04646],
      [5.6271, 52.0465],
      [5.62738, 52.04655],
      [5.62748, 52.04656],
      [5.62766, 52.04659],
      [5.62776, 52.0466],
      [5.62919, 52.04681],
      [5.63077, 52.04704],
      [5.63207, 52.04723],
      [5.63213, 52.04724],
      [5.63331, 52.04741],
      [5.63378, 52.04749],
      [5.63494, 52.0477],
      [5.63584, 52.0479],
      [5.63681, 52.04816],
      [5.63715, 52.04825],
      [5.63717, 52.04825],
      [5.63853, 52.04859],
      [5.63863, 52.04862],
      [5.63873, 52.04865],
      [5.63882, 52.04867],
      [5.6389, 52.04869],
      [5.63879, 52.04885],
      [5.63874, 52.04892],
      [5.63869, 52.04898],
      [5.63868, 52.04901],
      [5.63866, 52.04903],
      [5.6409, 52.04961],
    ];
    return {
      routeName,
      name,
      distance,
      date,
      organisator,
      coordinates,
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
  margin-top: 30px;
  height: 100px;
}
.item-box-4 p {
  margin-left: 20px;
  font-size: 18px;
}
</style>
