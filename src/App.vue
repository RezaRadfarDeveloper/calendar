<template>
  <div class="d-flex justify-content-start container ml-5 mt-5 mb-5">
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
</template>

<script>
import MonthTitle from './components/MonthTitle.vue';
import Days from './components/Days.vue';
import Hours from './components/Hours.vue';
import Doctors from './components/Doctors.vue';
// import {doctors} from './data.js';
import { mapActions } from 'vuex';

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
    Doctors
  },
  methods: {
    selectedDay(day) {
      this.loader = !this.loader;
      if (day > 0) {
        this.daySelected = true;
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

