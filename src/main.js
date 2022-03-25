import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'



const store = createStore({
    state(){
        return{
        publisherCompanyType: [],
        chosenPublisherCompanyType: "",
        selectedMembership: "",
        publisherError: false  
        }           // error- when user clicks "continue" without selecting publisher company type
  
    },
    mutations: {  //a mutation for each store attribute
      publisherCompanyType(state,payload) {
            state.publisherCompanyType = payload
      },
      chosenPublisherCompanyType(state,payload){
        state.chosenPublisherCompanyType = payload
      },
      selectedMembership(state,payload){
        state.selectedMembership = payload
      },
      publisherError(state,payload){
        state.publisherError = payload
      }
    },
    actions:{ //an action for each store attribute
      publisherCompanyType({commit},payload){
        commit('publisherCompanyType',payload)
      },
      chosenPublisherCompanyType({commit},payload){
        commit('chosenPublisherCompanyType',payload)
      },
      selectedMembership({commit},payload){
        commit('selectedMembership',payload)
      },
      publisherError({commit},payload){
        commit('publisherError',payload)
      }
    },
    getters: {  //a getter for each store attribute
        publisherCompanyType(state) {
            return state.publisherCompanyType;
        },
        chosenPublisherCompanyType(state){
          return state.chosenPublisherCompanyType
        },
        selectedMembership(state){
          return state.selectedMembership
        },
        publisherError(state) {
          return state.publisherError
        }
    }
  });

console.log("store: ", store)
const app = createApp(App)
app.use(store);
app.mount('#app');


