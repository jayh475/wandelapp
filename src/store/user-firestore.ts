import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
  where,
  getDoc,
  query,
  serverTimestamp,
  arrayUnion,
  QuerySnapshot,
  FieldPath,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKZxNz90PBrnXmBIt0uYNbtmZoV_Ehk_Y",
  authDomain: "de-wandelende-takken.firebaseapp.com",
  projectId: "de-wandelende-takken",
  storageBucket: "de-wandelende-takken.appspot.com",
  messagingSenderId: "626438875286",
  appId: "1:626438875286:web:e3359c051808a6a804fab7",
  measurementId: "G-EEX9DMPCQW",
};
initializeApp(firebaseConfig);
import { getUnixOfToday } from "../controllers/firestoreController";

const db = getFirestore();

export async function createUser(name: string, email: string, uid: string) {
  try {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, uid), {
      userID: uid,
      name: name,
      email: email,
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

export async function createWalk(
  organisator: string,
  title: string,
  location: string,
  distance: number,
  time: Timestamp,
  date: Timestamp,
  description: string,
  uid: string
) {
  try {
    // const docRef = doc(db, "users", uid);
    // const colRef = collection(docRef, "walks");
    const colRef = collection(db, "walks");
    await setDoc(doc(colRef), {
      organisator: organisator,
      uid: uid,
      title: title,
      location: location,
      distance: distance,
      time: time,
      date: date,
      description,
      visible: true,
      created: getUnixOfToday(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

async function joinedWalkArray(uid: string) {
  const docRef3 = doc(db, "users", uid);
  const colRef3 = collection(docRef3, "joinedWalks");
  const docRef4 = doc(colRef3, "joinedWalksDoc");
  let joinedWalkIds: Array<string> = [];
  const docSnap = await getDoc(docRef4);
  if (docSnap.exists()) {
    joinedWalkIds = docSnap.data().joinedWalksIds;
    return joinedWalkIds;
  } else {
    return [];
  }
}

// TODO set joined walks inside of this
// getMywalks(feature ones)
export async function getWalks(uid: string) {
  const map = new Map();
  try {
    // list with doc ids from walks that are joined
    let joinedWalkIds = await joinedWalkArray(uid);

    const colRef = collection(db, "walks");
    const q = query(colRef, where("date", ">=", getUnixOfToday()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid || joinedWalkIds.includes(doc.id)) {
        map.set(doc.id, doc.data());
      }
    });
    return map;

    // return list;
  } catch (error) {
    console.error("Error getting objects from Firebase Database", error);
  }
}

// profile view
export async function getAProfileHistoryWalks(uid: any) {
  let list: Array<any> = [];
  try {
    const colRef = collection(db, "walks");
    const q = query(
      colRef,
      where("uid", "==", uid),
      where("date", "<", getUnixOfToday())
    );
    // console.log(getUnixOfToday());

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });

    return list;
  } catch (error) {
    console.error("Error getting objects from Firebase Database", error);
  }
}
// https://firebase.google.com/docs/firestore/query-data/get-data
export async function getMyUpcomingDates(uid: string) {
  const map = new Map();
  try {
    const colRef = collection(db, "walks");
    const q = query(colRef, where("date", ">", getUnixOfToday()));
    let joinedWalkIds = await joinedWalkArray(uid);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid || joinedWalkIds.includes(doc.id)) {
        map.set(doc.id, doc.data().date);
      }
    });
    return map;
  } catch (error) {
    console.error("Error getting objects from Firebase Database", error);
  }
}

// everyones public walks
export async function getAllUpComingWalks() {
  // let list: Array<any> = [];
  const map = new Map();

  try {
    const colref = collection(db, "walks");
    const q = query(colref, where("date", ">=", getUnixOfToday()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      map.set(doc.id, doc.data());
    });
    // map.forEach((value, key) => {
    //   console.log(key + " = " + value);
    // });
    return map;
  } catch (error) {
    console.error("Error getting objects from Firebase database", error);
  }
}

export async function getMyWalk(docID: any) {
  const docRef = doc(db, "walks", docID);

  const querySnapshot = await getDoc(docRef);

  return { docId: querySnapshot.id, data: querySnapshot.data() };
}

export async function getProfileDetails(uid: any) {
  const docRef = doc(db, "users", uid);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data();
}

export async function participateInWalk(uid: string, name: string, docId: any) {
  try {
    const docRef = doc(db, "walks", docId);
    const colRef = collection(docRef, "participants");
    await setDoc(doc(colRef, uid), {
      uid: uid,
      name: name,
      accepted: false,
    });
  } catch (error) {
    console.error("Error sending objects to Firebase database", error);
  }
}

export async function acceptParticipant(theirUid: string, docId: any) {
  const docRef = doc(db, "walks", docId);
  const colRef = collection(docRef, "participants");
  const docRef2 = doc(colRef, theirUid);
  await updateDoc(docRef2, {
    accepted: true,
  });
  const docRef3 = doc(db, "users", theirUid);
  const colRef3 = collection(docRef3, "joinedWalks");
  // Hier gaat het
  const docRef4 = doc(colRef3, "joinedWalksDoc");

  const docSnap = await getDoc(docRef4);
  if (docSnap.exists()) {
    updateDoc(docRef4, {
      joinedWalksIds: arrayUnion(docId),
    });
  } else {
    console.log("document is being set");
    await setDoc(doc(colRef3, "joinedWalksDoc"), {
      joinedWalksIds: [docId],
    });
  }
}

export async function getPendingParticipants(docId: any) {
  let list: Array<any> = [];
  const docRef = doc(db, "walks", docId);
  const colRef = collection(docRef, "participants");
  const q = query(colRef, where("accepted", "==", false));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}

// export async function

export async function getAcceptedParticipants(docId: any) {
  let list: Array<any> = [];
  const docRef = doc(db, "walks", docId);
  const colRef = collection(docRef, "participants");
  const q = query(colRef, where("accepted", "==", true));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
}

// TODO finished walk
export async function saveFinishedWalk(
  coordinates: object,
  startTime: string,
  endTime: string,
  docIdWalk: any
) {
  let startTimeConvert = startTime.substring(15, 21);
  let endTimeConvert = endTime.substring(15, 21);
  let coordinatesAsString = JSON.stringify(coordinates);
  console.log(coordinatesAsString);
  console.log(startTimeConvert);
  console.log(endTimeConvert);

  const docRef = doc(db, "walks", docIdWalk);
  const colRef = collection(docRef, "finishedWalk");

  await setDoc(doc(colRef, "route"), {
    coordinates: coordinatesAsString,
    startTime: startTimeConvert,
    endTime: endTimeConvert,
  });
}
//TODO too see after finished
export async function getFinishedWalk(docIdWalk: any) {
  const docRef = doc(db, "walks", docIdWalk);
  const colRef = collection(docRef, "finishedWalk");
  const docRef2 = doc(colRef, "route");
  const querysnapshot = await getDoc(docRef2);
  console.log(querysnapshot.data());

  return querysnapshot.data();
}

// TODO needs to be done
export async function denieParticipant() {}

// export async function addFriend(
//   uid: string,
//   newFriendUid: string,
//   name: string
// ) {
//   const docRef = doc(db, "users", uid);
//   const colRef = collection(docRef, "friends");
//   setDoc(doc(colRef, newFriendUid), {
//     uid: newFriendUid,
//     name: name,
//   });
// }

//TODO needs to be done
// https://cloud.google.com/firestore/docs/samples/firestore-data-delete-collection
export async function deleteWalk(WalkId: any) {
  try {
    // finishedWalk -> route
    // participants = check  if docId(uid)
    // joinedWalks col(in users) -> joinedWalksDoc

    const docRef = doc(db, "walks", WalkId);

    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting data did not work ", error);
  }
}

export async function addPhoneNumberToUser(phoneNumber: String) {}
