<template>
  <div class="d-flex flex-column">
    <Navigation></Navigation>
  <router-view></router-view>
</div>
<Footer></Footer>
</template>

<script>
  import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';


// import {doctors} from './data.js';

export default {
  name: 'App',
  data() {
    return {
      
    
    }
  },
  components: {
    Footer,
    Navigation
}

}
</script>
<style>

</style>

