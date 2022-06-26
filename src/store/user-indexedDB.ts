import Dexie from "dexie";
import { db } from "./indexedDB";

// using indexed DB for user authentication
export default {
  async addUser(randomID: String, uid: string, displayName: string) {
    let users = db.users.toArray();
    let data = await users.then((results) => {
      return results;
    });
    if (data.length !== 0) {
    } else {
      db.users.put({
        randomID,
        uid: uid,
        name: displayName,
      });
    }
  },

  async LogOut() {
    let users: any = db.users.toArray();
    await db.users.where("randomID").equals("475").delete();
  },

  async getUserName() {
    let users: any = db.users;
    let user = await users.get("475");
    console.log();
    return user.name;
  },

  async isLoggedIn() {
    let users: any = db.users;
    let loggedIn = await Dexie.exists("deWandelendeTakken").then(function (
      exists
    ) {
      let data = users.get("475");
      if (exists) {
        if (typeof data === "undefined") {
          return false;
        } else {
          return true;
        }
      } else {
        console.log(!exists);
        return false;
      }
    });

    return loggedIn;
  },
};
