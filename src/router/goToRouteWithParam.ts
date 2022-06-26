import router from "./index";
import { useUserStore } from "../store/auth-store";
const userStore = useUserStore();

async function username() {
  let object = await userStore.getUsername;
  let name: String = object;
  return name;
}

export function goToMyWalks() {
  router.push({ name: "myWalks", params: { name: userStore.getUsername } });
}

export function goToCreateWalk() {
  router.push({ name: "createWalk", params: { name: userStore.getUsername } });
}

export function goToHome() {
  router.push({ name: "home" });
}

// my createdwalk
export function goToCreatedWalk(id: any) {
  router.push({
    name: "createdWalk",
    params: { name: userStore.getUsername, wandelingID: id },
  });
  console;
}

export function goToWalk(id: any, name: string) {
  router.push({
    name: "createdWalk",
    params: { name: name, wandelingID: id },
  });
}

export function goToAProfile(name: string, uid: string) {
  router.push({
    name: "profile",
    params: { name: name, uid: uid },
  });
}

// export function goToMywalk(){
//   router.push({ name: "createdWalk", params: { name: userStore.getUsername } });

// }
