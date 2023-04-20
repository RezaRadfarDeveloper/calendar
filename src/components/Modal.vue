<template>
  <div v-if="getModal" class="customModal">
    <Loading :content="'Logging out'"></Loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "./Loading.vue";

export default {
  components: {
    Loading,
  },
  computed: {
    ...mapGetters(["getModal"]),
  },
};
</script>

<style scoped>
.customModal {
  height: 200px;
  width: 400px;
  background-color: rgba(241, 241, 218, 1);
  position: absolute;
  top: 200px;
  left: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  z-index: 4;
  box-shadow: 10px 30px 85px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
</style>
