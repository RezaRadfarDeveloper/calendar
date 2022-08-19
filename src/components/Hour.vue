<template>
    <div class="hour">
        <div class="hourRectangle" :class="selected ? 'selectedClass' : '' " @click="activate(hour)"><span>{{hour}}</span></div>
    </div>
</template>

<script>
export default {
    props: ['hour', 'selectedHour'],
    methods: {
        activate(hour) {
            this.$emit('activate',hour)
        },
    },
    computed: {
        selected() {
            return this.hour === this.selectedHour && this.hour !== 0;
        }
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