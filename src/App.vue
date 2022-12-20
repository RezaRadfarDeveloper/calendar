<template>
  <div class="main d-flex flex-column">
    <Modal></Modal>
    <Navigation></Navigation>
  <router-view></router-view>
</div>
<Footer></Footer>
</template>

<script>
  import Navigation from './components/Navigation.vue';
  import Footer from './components/Footer.vue';
  import Modal from './components/Modal.vue'


// import {doctors} from './data.js';

export default {
  name: 'App',
  data() {
    return {
      
    
    }
  },
  components: {
    Footer,
    Navigation,
    Modal
}

}
</script>
<style>

.main {
  position:relative;
}
</style>

