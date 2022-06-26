import { defineStore } from "pinia";

// const walk = { name: 'Marlo' }

export const useWalkingInfoStore = defineStore('walkingInfoStore', {

     // De STATE is de centrale plek van de store 
     state: () => {

        return {
            walks: [],
        }
    },

     //actions
    actions: {

        fill() {
             
        }



    }
     //getters

});