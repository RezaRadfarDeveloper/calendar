<template>
    <div class="steps">
        <div class="step" :class="oldActive !== ''? 'completed' : ''"><CheckSvg :class="oldActive !== ''? 'ticked' : 'hide'"></CheckSvg><span :class=" Active  === 'continue' ? 'completed-text' : ''">1.</span><span :class="Active === 'continue' || Active === ''? 'completed-text' : ''">Appointments</span></div>
        <div class="step" :class="oldActive === 'appointment' || oldActive === 'finalize' ? 'completed' : '' "><CheckSvg :class="oldActive === 'appointment' || oldActive === 'finalize' ? 'ticked' : 'hide'"></CheckSvg><span  :class=" Active === 'appointment'? 'completed-text' : ''" >2.</span><span :class=" Active === 'appointment'? 'completed-text' : ''" >Personal Details</span></div>
        <div class="step" :class="oldActive === 'finalize'? 'completed' : '' "><CheckSvg :class="oldActive === 'finalize'? 'ticked' : 'hide'"></CheckSvg><span :class=" Active === 'finalize'? 'completed-text' : ''">3.</span><span :class=" Active === 'finalize'? 'completed-text' : ''">Confirmation</span></div>
    </div>
</template>
<script>
import CheckSvg from './CheckSvg.vue';

export default {
    props:  ['Active', 'oldActive'],
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

.completed {
 border-bottom: 3px #f47721 solid;
 color: #f47721;
}

.ticked {
    color:#f47721;
}

.completed-text {
    color: black;
}
</style>