<template>
<div class="d-flex flex-column">
  <Steps></Steps>
  <div>
    <div v-if="true" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
        <div>
          <MonthTitle></MonthTitle>
          <!-- <button @click="inc(11)">add 11</button>
          <button @click="increase">add 2</button> -->
          <Days @selectedDay="selectedDay"></Days>
          <Transition name="hours">
            <Hours v-if="daySelected"  @selectedHour="selectedHour" :loader="loader"></Hours>
          </Transition>
        </div>
        <div class="doctors">
          <Doctors :daySelected="day"  :hourSelected="hour"></Doctors>
        </div>
    </div>
    <div class="mb-5">
        <Button :class=" showContinue ? 'd-block' : 'd-none'"></Button>
  </div>
  </div>
    <div v-if="false" class="d-flex justify-content-start container ml-5 mt-5 mb-5">

    hello
  </div>
  <div v-if="false" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
    yes
  </div>
    <Footer></Footer>
</div>
</template>

<script>
import MonthTitle from './components/MonthTitle.vue';
import Days from './components/Days.vue';
import Hours from './components/Hours.vue';
import Doctors from './components/Doctors.vue';
import Steps from './components/Steps.vue';
import Button from './components/Button.vue';
import Footer from './components/Footer.vue'

// import {doctors} from './data.js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      daySelected: false,
      hourSelected:false,
      loader: false,
      day:0,
      hour:0
    }
  },
  
  mounted() {
      // this.listDoctors();
      // console.log(this.resetHour)
  },
  components: {
    MonthTitle,
    Days,
    Hours,
    Doctors,
    Steps,
    Button,
    Footer
},

computed: {
    showContinue()  {
      return this.daySelected && this.hourSelected && this.doctorSelected ;
    },

    ...mapGetters(['doctorSelected'])
},
  methods: {
    selectedDay(day) {
      this.loader = !this.loader;
      if (day > 0) {
        this.daySelected = true;
        this.hourSelected = false;
        this.day = day;
        this.hour = 0;
        this.$store.dispatch('resetHour', true);
        // console.log(this.day);
      }
    },

    selectedHour(hour) {
      if(hour > 0) {
        this.hourSelected = true;
        this.hour = hour;
        this.$store.dispatch('resetHour', false);
        // console.log(this.hour);
      }
    },
      ...mapActions({
        resetHour: 'resetHour'
            // inc: 'increment',
            // increase: 'increase'
        })

  }

}
</script>
<style>
.hours-enter-active,
.hours-leave-active {
  transition: opacity 2s ease;
}

.hours-enter-from,
.hours-leave-to {
  opacity: 0;
}

.doctors {
  width: 300px;
  height: 40%;
  border: 1px solid rgb(100,175,160);
  border-radius: 4px;
  margin-left: 30px;
  /* position: absolute;
  top: 20px;
  left: 400px; */
}
</style>

