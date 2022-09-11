<template>
    <div class="day">
        <div  :class="[selected ? 'selectedClass' : '', !doctorSelected || doctorHasTheDay ? 'dayCircle' : 'deActiveDay']"  @click="activate(day)"><span>{{day}}</span></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['day', 'selectedDay'],
    methods: {
        activate(day) {
            this.setSelectedDay(day);
            if(!this.doctorSelected || this.doctorHasTheDay)
            this.$emit('activate',day)
            // this.$store.dispatch('increase')
        },
        ...mapActions(['setSelectedDay'])
    },
    computed: {
        selected() {
            return this.day === this.selectedDay || this.getSelectedDay === this.day;
        },
        ...mapGetters(['doctorSelected', 'getSelectedDay']),
        doctorHasTheDay() {
            // TBD here we check which days exist for the selected doctor...
            return this.doctorSelected && this.doctorSelected.days.August.indexOf(this.day) !== -1;
        }

    }
}
</script>

<style>
.day {
    width: 16%;
    height: 16%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dayCircle {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border:solid 1px rgb(100,175,160);
    color: black;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dayCircle:hover {
    cursor: pointer;
    background-color: rgb(100,175,160);
    color:white;
}

.selectedClass {
    background-color: rgb(100,175,160);
    color:white;
}

.deActiveDay {
    color:gray ;
    background-color: white;
}
</style>