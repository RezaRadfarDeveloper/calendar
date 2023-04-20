<template>
  <div class="hours">
    <div v-if="loading">
      <Loading :content="'Loading'"></Loading>
    </div>
    <Hour
      v-else
      v-for="i in 24"
      :key="i"
      :disabledHour="!hourDisabled(i)"
      :selectedHour="selectedHour"
      :hour="i"
      @activate="activate"
    ></Hour>
  </div>
</template>
<script>
import Hour from "./Hour.vue";
import Loading from "./Loading.vue";
import { doctors } from "../data.js";
import { mapGetters } from "vuex";

export default {
  props: ["loader"],
  data() {
    return {
      selectedHour: 0,
      loading: false,
      doctorsList: doctors,
    };
  },
  components: {
    Hour,
    Loading,
  },
  // to test selected hours to be shown in the hours panel
  methods: {
    activate(hour) {
      this.selectedHour = hour;
      this.$emit("selectedHour", this.selectedHour);
    },
    activeLoader() {
      setTimeout(() => (this.loading = false), 2000);
    },
    //just for testing the initial list of hours to be loaded....
    selectHours() {
      this.doctorsList = this.getDoctorsList;
      var hours = [];
      this.doctorsList.filter(function (doctor) {
        hours = hours.concat(doctor.hours);
      });

      var count = 0;
      var beforeCount = hours.length;
      for (var i = 0; i < hours.length - 2; i++) {
        for (var j = i + 1; j < hours.length - 1; j++) {
          if (hours[i] === hours[j] && hours[j] != 0) {
            hours[j] = 0;
            count = count + 1;
          }
        }
      }

      return hours.slice(0, beforeCount - (count + 1));
    },

    hourDisabled(hour) {
      return this.selectHours().indexOf(hour) !== -1;
    },
  },
  computed: {
    ...mapGetters(["getDoctorsList"]),
  },
  watch: {
    loader(newValue, oldValue) {
      this.loading = true;
      if (newValue != oldValue) {
        this.activeLoader();
      }
    },
  },
};
</script>

<style scoped>
.hours {
  width: 300px;
  height: 300px;
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid rgb(100, 175, 160);
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
}
</style>
