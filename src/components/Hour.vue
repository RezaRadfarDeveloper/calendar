<template>
    <div class="hour">
        <div class="hourRectangle" :class="selected ? 'selectedClass' : '' " @click="activate(hour)"><span>{{hour}}</span></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['hour', 'selectedHour'],
    methods: {
        activate(hour) {
        this.setSelectedHour(hour)
            this.$emit('activate',hour)
            // this.$store.dispatch('increment', 6);
        },
        ...mapActions(['setSelectedHour'])
    },
    computed: {
        selected() {
            return (this.hour === this.selectedHour || this.hour === this.getSelectedHour) && !this.$store.getters.hourSelected;
        },
        // counter() {
        //   return   this.$store.getters.finalCounter;
        // }
        ...mapGetters(['finalCounter', 'getSelectedHour'])
    }
}
</script>

<style>
.hour {
    width: 20%;
    height: 16%;
    background-color: white;
    display: flex;
    margin-left:10px;
    justify-content: space-between;
    align-items: center;
}

.hourRectangle {
    width: 60px;
    height: 20px;
    border-radius: 2px;
    border:solid 1px rgb(100,175,160);
    color: #4e6876;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hourRectangle:hover {
    cursor: pointer;
    background-color: rgb(100,175,160);
    color:white;
}

.selectedClass {
    background-color: rgb(100,175,160);
    color:white;
}
</style>