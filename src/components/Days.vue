<template>
    <div class="days">
        <Day v-for="i in 31" :key="i" :selectedDay="selectedDay" :day="i" @activate="activate"></Day>   
    </div>
</template>

<script>
import Day from './Day.vue';

export default {
    data() {
        return {
            selectedDay: 0
        }
    },
    components: {
        Day
    },
    methods: {
        activate(day) {
           this.selectedDay = day;
           this.$emit('selectedDay', this.selectedDay);
           this.$emit('resetHour');
        }
    }
}
</script>

<style>
.days {
    width: 300px;
    height: 300px;
    background-color:white;
    padding: 10px;
    border: 1px solid rgb(100,175,160);
    border-radius: 0px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    display: flex;
    flex-wrap: wrap;
}

</style>