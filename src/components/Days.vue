<template>
  <div class="days">
    <Day
      v-for="i in getDaysInCurrentMonth"
      :key="i"
      :disabledDay="!dayDisabled(i)"
      :selectedDay="selectedDay"
      :day="i"
      @activate="activate"
    ></Day>
  </div>
</template>

<script>
import Day from "./Day.vue";
import { doctors } from "../data.js";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedDay: 0,
      doctorsList: doctors,
    };
  },
  mounted() {
    this.setSelectedMonth("Current");
    this.selectDays();
    // this.setReservation();
  },
  components: {
    Day,
  },
  methods: {
    activate(day) {
      this.selectedDay = day;
      this.$emit("selectedDay", this.selectedDay);
      //    this.$emit('resetHour');
    },
    dayDisabled(day) {
      return this.selectDays().indexOf(day) !== -1;
    },
    ...mapActions(["setSelectedMonth", "setSelectedDays"]),
    selectDays() {
      this.doctorsList = this.getDoctorsList;
      var days = [];
      var selectedMonth = this.getSelectedMonth;
      this.doctorsList.filter(function (doctor) {
        days = days.concat(doctor.days[selectedMonth]);
      });
      var count = 0;
      var beforeCount = days.length;
      for (var i = 0; i < days.length - 2; i++) {
        for (var j = i + 1; j < days.length; j++) {
          if (days[i] === days[j] && days[j] != 0) {
            days[j] = 0;
            count = count + 1;
          }
        }
      }
      this.setSelectedDays(days.sort().slice(count, beforeCount));
      return days.sort().slice(count, beforeCount);
    },
  },
  computed: {
    ...mapGetters([
      "getDoctorsList",
      "getSelectedMonth",
      "getDaysInCurrentMonth",
    ]),
  },
};
</script>

<style scoped>
.days {
  width: 300px;
  height: 300px;
  background-color: white;
  padding: 10px;
  border: 1px solid rgb(100, 175, 160);
  border-radius: 0px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  display: flex;
  flex-wrap: wrap;
}
</style>
