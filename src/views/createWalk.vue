<template>
  <dynamic-header
    title="Create Walk"
    backgroundColor="#2a2e43;"
    color="white"
  ></dynamic-header>

  <div class="item-box-1">
    <h1>Create Walk</h1>
    <button class="backBtn" @click="goToMyWalks">Back</button>
  </div>

  <n-form
    style="margin-left: 25px; margin-right: 25px"
    :model="formValue"
    :rules="rules"
    ref="formRef"
    :label-width="80"
    size="large"
  >
    <n-form-item path="title" label="Title">
      <n-input v-model:value="formValue.title" />
    </n-form-item>
    <n-grid :span="1" :x-gap="15">
      <n-form-item-gi path="location" label="Location" :span="12">
        <n-input v-model:value="formValue.location" />
      </n-form-item-gi>
      <n-form-item-gi path="distance" label="Distance in km" :span="12">
        <n-input-number v-model:value="formValue.distance" clearable />
      </n-form-item-gi>

      <n-form-item-gi path="time" label="Time" :span="12">
        <n-time-picker v-model:value="formValue.time" />
      </n-form-item-gi>

      <n-form-item-gi path="date" label="Date" :span="12">
        <n-date-picker v-model:value="formValue.date" type="date" />
      </n-form-item-gi>
    </n-grid>

    <n-form-item label="Description" path="description">
      <n-input
        v-model:value="formValue.description"
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 5,
        }"
      />
    </n-form-item>

    <button class="createWalk" @click="handleValidateClick()">
      Create walk
    </button>
  </n-form>
</template>

<script lang="ts">
import DynamicHeader from "../components/DynamicHeader.vue";
import { ref } from "vue";
import { goToMyWalks } from "../router/goToRouteWithParam";
import { createWalk } from "../store/user-firestore";
import { useUserStore } from "../store/auth-store";
import { unixToTime, unixToDate } from "../controllers/createWalkControlle";
import {
  FormInst,
  useMessage,
  NFormItem,
  NForm,
  NInput,
  NInputNumber,
  NTimePicker,
  NDatePicker,
  NFormItemGi,
  NGrid,
} from "naive-ui";

export default {
  components: {
    DynamicHeader,
    NFormItem,
    NForm,
    NInput,
    NInputNumber,
    NTimePicker,
    NDatePicker,
    NFormItemGi,
    NGrid,
    useMessage,
  },
  setup() {
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const userStore = useUserStore();
    const username = userStore.getUsername;
    const uid = userStore.getUID;

    const formValue = ref({
      title: null,
      location: null,
      distance: null,
      time: null,
      date: null,
      description: null,
    });
    const rules = {
      title: {
        required: true,
        message: "Please input your title",
        trigger: "blur",
      },
      location: {
        required: true,
        message: "Please input the start location",
        trigger: "blur",
      },
      distance: {
        type: "number",
        required: true,
        message: "Please input the distance",
        trigger: "blur",
      },
      time: {
        type: "number",
        required: true,
        trigger: ["blur", "change"],
        message: "Please input time",
      },
      date: {
        type: "number",
        required: true,
        trigger: ["blur", "change"],
        message: "Please input date",
      },
      description: {
        required: true,
        trigger: ["blur", "input"],
        message: "Please input description",
      },
    };

    return {
      goToMyWalks,
      rules,
      formRef,
      formValue,
      handleValidateClick() {
        formRef.value?.validate((errors) => {
          if (!errors) {
            let value: any = formValue.value;

            unixToDate(value.date);
            console.log("date ", value.date);

            unixToTime(value.time);
            console.log("TIME ", value.time);

            createWalk(
              username,
              value.title,
              value.location,
              value.distance,
              value.time,
              value.date,
              value.description,
              uid
            );
            message.success("valid");
            goToMyWalks();
          } else {
            console.log(errors);
            message.error("ivalid");
          }
        });
      },
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

h1 {
  margin-left: 25px;
}
.item-box-1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
