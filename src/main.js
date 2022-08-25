import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons';

/* add icons to the library */
library.add(fas)

const store = createStore({
    state() {
        return {
            counter:0,
            resetHour: false,
            selectedDoctor: null
        }
    },
    mutations: {
        increment(state,payload) {
            state.counter = state.counter + payload;
        },
        increase(state) {
            state.counter = state.counter + 2;
        },
        resetHour(state, payload) {
            state.resetHour = payload;
        },

        setDoctor(state, payload) {
            state.selectedDoctor = payload;
        }
    },
    actions: {
            increment(context, payload) {
                context.commit('increment', payload);
            },
            increase(context) {
                context.commit('increase');
            },
            resetHour(context, payload) {
                context.commit('resetHour', payload);
            },
            setDoctor(context, payload) {
                context.commit('setDoctor', payload);
            }
    },
    getters: {
        finalCounter(state) {
           return  state.counter * 3;
        },

        hourSelected(state) {
            return state.resetHour;
        },
        doctorSelected(state) {
            return state.selectedDoctor;
        }
    }
})

const app =createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"