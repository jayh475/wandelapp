<template>
  <div :style="'background-color:' + backgroundColor" class="dynamicBox">
    <p :style="'color:' + color + ';font-size:29px'">{{ title }}</p>
    <!-- <h1>Route</h1> -->
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    backgroundColor: String,
    color: String,
  },
  setup(props: any) {
    console.log("Header Title: " + props.title);
  },
};
</script>

<style>
.dynamicBox {
  height: 110px;
  /* background: #2a2e43; */
  border-bottom-left-radius: 85px;
}

.dynamicBox p {
  color: white;
  justify-self: center;
  margin: 0 0 0 50px;
  font-size: 45px;
  padding: 25px 0 0 0;
  font-weight: 700;
}
</style>
