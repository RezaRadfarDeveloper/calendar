<template>
    <div class="day">
        <div class="dayCircle" :class="selected ? 'selectedClass' : '' " @click="activate(day)"><span>{{day}}</span></div>
    </div>
</template>

<script>
export default {
    props: ['day', 'selectedDay'],
    methods: {
        activate(day) {
            this.$emit('activate',day)
        },
    },
    computed: {
        selected() {
            return this.day === this.selectedDay;
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
</style>