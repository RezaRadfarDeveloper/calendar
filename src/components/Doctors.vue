<template>
  <div>
    <div v-if="loading">
      <Loading :content="'Loading'"></Loading>
    </div>
    <div v-else>
      <Doctor
        v-for="doctor in doctorsList"
        @click="selectByDoctor(doctor.id)"
        :key="doctor.id"
        :doctor="doctor"
      ></Doctor>
    </div>
  </div>
</template>

<script>
import Doctor from "./Doctor.vue";
import Loading from "./Loading.vue";
import { doctors } from "../data.js";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      doctorsList: doctors,
      loading: false,
    };
  },
  props: ["hourSelected", "daySelected", "resetHour"],

  components: {
    Doctor,
    Loading,
  },

  methods: {
    activeLoader() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    selectByDoctor(id) {
      const doctor = doctors.find((doc) => doc.id === id);
      this.$store.dispatch("setDoctor", doctor);
      // we duplicate doctor in an array since we need array of object with more than one element
      this.setDoctorsList([doctor, doctor]);
      this.selectedDoctorName(doctor.name);
    },
    //  hours cannot be selected without day selected
    selectDoctors() {
      console.log("selectedMonth is: " + this.getSelectedMonth);
      if (this.getSelectedMonth === "Current") var month = "Current";
      else month = "NextMonth";
      this.activeLoader();
      if (this.hourSelected > 0 && this.daySelected > 0) {
        let hour = this.hourSelected;
        let day = this.daySelected;

        var list = doctors.filter(function (doctor) {
          return (
            doctor.days[month].indexOf(day) !== -1 &&
            doctor.hours.indexOf(hour) !== -1
          );
        });
      } else if (this.hourSelected < 1 && this.daySelected > 0) {
        let day = this.daySelected;
        list = doctors.filter(function (doctor) {
          return doctor.days[month].indexOf(day) !== -1;
        });
      }
      this.setDoctorsList(list);
      return list;
    },

    ...mapActions(["setDoctorsList", "selectedDoctorName"]),
  },
  computed: {
    ...mapGetters(["getSelectedMonth"]),
  },
  watch: {
    hourSelected(oldValue, newValue) {
      if (oldValue != newValue) {
        this.doctorsList = this.selectDoctors();
      }
    },
    daySelected(oldValue, newValue) {
      if (oldValue != newValue) {
        this.doctorsList = this.selectDoctors();
      }
    },
  },
};
</script>
