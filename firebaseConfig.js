import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import store from "./src/store/store";

let getConfig = null;

function render() {
  getConfig = store.getState().websiteSetup?.websiteSetup?.payload?.firebase_info;
}
render();
store.subscribe(() => {
  render();
});

const firebaseCloudMessaging = {
  init: async function () {
    if (getApps().length === 0 && getConfig) {
      initializeApp({
        apiKey: getConfig.apiKey,
        authDomain: getConfig.authDomain,
        projectId: getConfig.projectId,
        storageBucket: getConfig.storageBucket,
        messagingSenderId: getConfig.messagingSenderId,
        appId: getConfig.appId,
        measurementId: getConfig.measurementId,
      });

      try {
        const messaging = getMessaging();
        const status = await Notification.requestPermission();

        if (status === "granted") {
          const fcm_token = await getToken(messaging, { vapidKey: getConfig.certificates });
          if (fcm_token) {
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};

export { firebaseCloudMessaging };
