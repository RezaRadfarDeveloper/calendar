import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue';
import Profile from './components/Profile.vue';
import Hour from './components/Hour.vue';
import Home from './components/Home.vue';
import { doctors } from './data.js';


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
            selectedDoctor: null,
            formIsValid: false,
            doctorsList: doctors,
            formFields: {
                name: '',
                family: '',
                dateOfBirth: '',
                password: '',
                title: '',
                email: ''
            },
            formErrors: {
                name:'name is required',
                family: 'family is required',
                password: 'password is required and should be at least 8 characters',
                dateOfBirth: 'date of birth is required'
            },
            validationClicked: false,
            selectedDay: 0,
            selectedHour: 0,
            currentMonth: '',
            nextMonth: '',
            selectedMonth: 'Current',
            daysInCurrentMonth: 0,
            daysInNextMonth: 0,
            monthCounter: 1,
            selectedDays: [],
            signedUp: false,
            userId: 0,
            token: null,
            showModal: false
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
        },
        validateForm(state, payload) {
            state.formIsValid = payload;
        },
        setValidationClicked(state, payload) {
            state.validationClicked = payload
        },
        setFormFields(state, payload) {
            state.formFields = payload;
        },
        setFormErrors(state, payload) {
            state.formErrors = payload;
        },
        setSelectedDay(state, payload) {
            state.selectedDay = payload;
        },
        setSelectedHour(state, payload) {
            state.selectedHour = payload;
        },
        setDoctorsList(state, payload) {
            state.doctorsList = payload;
        },
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setNextMonth(state, payload) {
            state.nextMonth = payload;
        },
        setSelectedMonth(state, payload) {
            state.selectedMonth = payload;
        },
        setDaysInCurrentMonth(state, payload) {
            state.daysInCurrentMonth = payload;
        },
        setDaysInNextMonth(state, payload) {
            state.daysInNextMonth = payload;
        },
        setMonthCounter(state, payload) {
            return state.monthCounter= payload;
        },
        setSelectedDays(state, payload) {
            return state.selectedDays = payload;
        },
        setSignedUp(state, payload) {
            return state.signedUp = payload;
        },
        setUserId(state,payload) {
            return state.userId = payload;
        },
        setToken(state,payload) {
            return state.token = payload;
        },
        setModal(state, payload) {
            return state.showModal = payload;
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
            },
            setDoctorsList(context, payload) {
                context.commit('setDoctorsList', payload);
            },
            validateForm(context,payload) {
                context.commit('validateForm', payload);
            },
            setValidationClicked(context, payload) {
                context.commit('setValidationClicked',payload)
            },
            setFormFields(context,payload) {
                context.commit('setFormFields', payload);
            },
            setFormErrors(context, payload) {
                context.commit('setFormErrors', payload);
            },
            setSelectedDay(context, payload) {
                context.commit('setSelectedDay', payload);
            },
            setSelectedHour(context, payload) {
                context.commit('setSelectedHour', payload);
            },
            setCurrentMonth(context, payload) {
                context.commit('setCurrentMonth', payload);
            },

            setNextMonth(context, payload) {
                context.commit('setNextMonth', payload);
            },
            setSelectedMonth(context, payload) {
                context.commit('setSelectedMonth', payload);
            },
            setDaysInNextMonth(context, payload) {
                context.commit('setDaysInNextMonth', payload);
            },
            setDaysInCurrentMonth(context, payload) {
                context.commit('setDaysInCurrentMonth', payload);
            },
            setMonthCounter(context, payload) {
                context.commit('setMonthCounter', payload);
            },
            setSelectedDays(context, payload) {
                context.commit('setSelectedDays', payload);
            },
            setSignedUp(context, payload) {
                context.commit('setSignedUp', payload);
            },
            setUserId(context,payload) {
                context.commit('setUserId', payload);
            },
            setToken(context, payload) {
                context.commit('setToken', payload);
            },
            setModal(context, payload) {
                context.commit('setModal', payload);
            }
     },
    getters: {
        finalCounter(state) {
            return  state.counter * 3;
        },
        getDoctorsList(state) {
            return state.doctorsList;
        },
        hourSelected(state) {
            return state.resetHour;
        },
        doctorSelected(state) {
            return state.selectedDoctor;
        },

        formIsValidated(state) {
            return state.formIsValid;
        },

        formFields(state) {
            return state.formFields
        },

        formErrors(state) {
            return state.formErrors;
        },

        getValidationClicked(state) {
            return state.validationClicked;
        },
        getSelectedDay(state) {
            return state.selectedDay;
        },
        getSelectedHour(state) {
            return state.selectedHour;
        },

        getCurrentMonth(state) {
            return state.currentMonth;
        },

        getNextMonth(state) {
            return state.nextMonth;
        },
        getSelectedMonth(state) {
            return state.selectedMonth;
        },
        getDaysInCurrentMonth(state) {
            return state.daysInCurrentMonth;
        },
        getDaysInNextMonth(state) {
            return state.daysInNextMonth;
        },
        getMonthCounter(state) {
            return state.monthCounter;
        },
        getSelectedDays(state) {
            return state.selectedDays;
        },
        getSignedUp(state) {
            return state.signedUp;
        },
        getUserId(state) {
            return state.userId;
        },
        getToken(state) {
            return state.token;
        },
        getModal(state) {
            return state.showModal;
        }
       
    }
})

const app =createApp(App);
const router = createRouter({
    routes: [
        { path: '/profile', name: 'profile', component: Profile},
        { path: '/', name: 'home', component: Home},
        {path: '/hour', name: 'hour', component: Hour}
    ],
    history: createWebHistory()
});
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount('#app')
// import "bootstrap/dist/js/bootstrap.js"