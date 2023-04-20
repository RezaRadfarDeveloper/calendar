<template>
  <div class="doctor" :class="selected ? 'doctorSelected' : ''">
    <div><img :src="getImage" /></div>
    <!-- <div><img src="https://picsum.photos/200/300?random=1"></div> -->
    <div class="doctor-label">
      <h5>{{ doctor.name }}</h5>
      <p>{{ doctor.field }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["doctor"],
  computed: {
    selected() {
      return this.doctorSelected && this.doctor.id === this.doctorSelected.id;
    },
    ...mapGetters(["doctorSelected"]),
    getImage() {
      return "../img/" + this.doctor.image;
    },
  },
};
</script>

<style scoped>
.doctor {
  height: 86px;
  padding: 15px 20px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  position: relative;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 400px;
  font-style: normal;
  flex-wrap: wrap;
  cursor: pointer;
}
img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.doctor-label {
  padding-left: 12px;
  display: flex;
  flex-direction: column;
}
.doctor-label h5 {
  font-size: 15px;
  color: #000;
  line-height: 20px;
  margin: 0;
  font-weight: 400;
}

.doctorSelected {
  border: solid 1px rgb(100, 175, 160);
  background: #ecf3f0;
  border-bottom: solid 2px rgb(100, 175, 160);
}
</style>
