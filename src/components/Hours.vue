<template>
<div class="hours">
    <div v-if="loading">
     <Loading></Loading>
    </div>
    <Hour v-else v-for="i in 24" :key="i" :selectedHour="selectedHour" :hour="i" @activate="activate"></Hour>
</div>
</template>
<script>

import Hour from './Hour.vue';
import Loading from './Loading.vue';

export default {
    props: ['loader'],
    data() {
        return {
            selectedHour: 0,
            loading:false
        }
    },
    components: {
        Hour,
        Loading
    },
     methods: {
        activate(hour) {
           this.selectedHour = hour;
           this.$emit('selectedHour', this.selectedHour);
        },
        activeLoader() {
            setTimeout(() => this.loading = false
            , 2000);
        }
    },
    watch: {
        loader(newValue, oldValue) {
            this.loading = true;
            if(newValue != oldValue) {
                this.activeLoader();
            }
        }
    },


}
</script>

<style>
.hours {
    width: 300px;
    height: 300px;
    background-color:white;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-wrap: wrap;
    border: 1px solid rgb(100,175,160);
    border-radius:0px 0px 10px 10px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
}
</style>