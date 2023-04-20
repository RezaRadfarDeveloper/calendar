<template>
  <div class="button-wrapper">
    <button class="continue">{{ buttonText }}</button>
  </div>
</template>
<script>
export default {
  props: ["buttonText"],
};
</script>
<style scoped>
.continue {
  background: #1b6893 !important;
  border: 0;
  height: 45px;
  width: 350px;
  color: #fff;
  margin: 0 auto;
  display: block;
  border-radius: 0px;
  font-family: "Source Sans Pro", sans-serif;
}

.button-wrapper {
  width: 950px;
  height: 45px;
  margin: 30px 0;
}
</style>
