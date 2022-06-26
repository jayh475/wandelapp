import Dexie from "dexie";
import { db } from "./indexedDB";

// using indexed DB for user authentication
export default {
  async addUser(randomID: string, uid: string, displayName: string) {
    let users = db.users.toArray();
    let data = await users.then((results) => {
      return results;
    });
    if (data.length !== 0) {
      return
    } else {
      db.users.put({
        randomID,
        uid: uid,
        name: displayName,
      });
    }
  },

  async LogOut() {
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
    let loggedIn = await Dexie.exists("deWandelendeTakken").
    then(function(exists) {
      if (exists) {
        let data = users.get("475");
        return typeof data !== "undefined";
      }
    })
    return loggedIn;
  },
};
