<template>
    <div class="steps">
        <div class="step"><CheckSvg class="hide"></CheckSvg><span class="completed-text">1.</span><span class="completed-text">Appointments</span></div>
        <div class="step completed"><CheckSvg></CheckSvg><span>2.</span><span>Personal Details</span></div>
        <div class="step"><CheckSvg class="hide"></CheckSvg><span>3.</span><span>Confirmation</span></div>
    </div>
</template>
<script>
import CheckSvg from './CheckSvg.vue';

export default {
    components: {
    CheckSvg,
   
}
}
</script>

<style scoped>
.steps {
    margin: auto;
    width: 1400px;
    height: 50px;
    display: flex;
    justify-content: center;
}

.step {
    width: 33%;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    color: #bfc1c3;
    font-weight: bold;
}

.hide {
    display: none;
}

.current {
    display: block;
}
.completed {
 border-bottom: 3px #f47721 solid;
 color: #f47721;
}

.completed-text {
    color: black;
}
</style>