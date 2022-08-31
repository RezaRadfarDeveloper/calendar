<template>
<div class="d-flex flex-column">
  <Steps :oldActive="previousStep" :Active="step"></Steps>
  <div>
    <div v-if="step === 'continue'" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
        <div>
          <MonthTitle></MonthTitle>
          <Days @selectedDay="selectedDay"></Days>
          <Transition name="hours">
            <Hours v-if="daySelected"  @selectedHour="selectedHour" :loader="loader"></Hours>
          </Transition>
        </div>
        <div class="doctors">
          <Doctors :daySelected="day"  :hourSelected="hour"></Doctors>
        </div>
    </div>
    <div class="mb-5">
        <Button :class=" showContinue && step === 'continue' ? 'd-block' : 'd-none'" :buttonText="step" @click="setStep('continue','appointment')"></Button>
    </div>
  </div>
    <div v-if="step === 'appointment'"  class="d-flex flex-column justify-content-start container ml-5 mt-5 mb-5">
    <Form :buttonClicked="registeredClicked" @resetButton="resetSubmit"></Form>
    <Button  :class=" step=== 'appointment' ? 'd-block' : 'd-none'" :buttonText="step" @click="setStep('appointment','finalize')"></Button>
  </div>
  <div v-if="step === 'finalize'" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
    yes
    <Button :class=" step === 'finalize' ? 'd-block' : 'd-none'" :buttonText="step" @click="setStep('finalize','continue')"></Button>
  </div>
  <Back v-if="oldStep !== ''" @click="setStep(twoStepBefore,oldStep)"></Back>
    <Footer></Footer>
</div>
</template>

<script>
import MonthTitle from './components/MonthTitle.vue';
import Days from './components/Days.vue';
import Hours from './components/Hours.vue';
import Doctors from './components/Doctors.vue';
import Steps from './components/Steps.vue';
import Button from './components/Button.vue';
import Footer from './components/Footer.vue';
import Form from './components/Form.vue';
import Back from './components/Back.vue';

// import {doctors} from './data.js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      daySelected: false,
      hourSelected:false,
      loader: false,
      day:0,
      hour:0,
      continue:true,
      appointment:false,
      finalize:false,
      stepValue: 'continue',
      oldStep: '',
      registeredClicked:false,
      details: null,
      twoStepBefore: ''
    
    }
  },
  
  mounted() {
      // this.listDoctors();
      // console.log(this.resetHour)
  },
  components: {
    MonthTitle,
    Days,
    Hours,
    Doctors,
    Steps,
    Button,
    Footer,
    Form,
    Back
},

computed: {
    showContinue()  {
      return this.daySelected && this.hourSelected && this.doctorSelected ;
    },

    ...mapGetters(['doctorSelected']),

    step() {
      return this.stepValue;
    },
    previousStep() {
      return  this.oldStep;
    }

},
  methods: {
    selectedDay(day) {
      this.loader = !this.loader;
      if (day > 0) {
        this.daySelected = true;
        this.hourSelected = false;
        this.day = day;
        this.hour = 0;
        this.$store.dispatch('resetHour', true);
      }
    },
    selectedHour(hour) {
      if(hour > 0) {
        this.hourSelected = true;
        this.hour = hour;
        this.$store.dispatch('resetHour', false);
      }
    },

    registerDetails() {
        this.registeredClicked = true;
    },
      ...mapActions({
        resetHour: 'resetHour'
        }),
      setStep(oldValue,newValue) {

        this.stepValue = newValue;
        this.oldStep = oldValue;
        oldValue === 'continue' ? this.registeredClicked = false : this.registeredClicked = true; 
          
          if(this.oldStep === 'appointment')
        this.twoStepBefore = 'continue';
        else if( this.oldStep ==='finalize')
        this.twoStepBefore = 'appointment'
        else 
        this.twoStepBefore= ''
      }
      
  }

}
</script>
<style>
.hours-enter-active,
.hours-leave-active {
  transition: opacity 2s ease;
}

.hours-enter-from,
.hours-leave-to {
  opacity: 0;
}

.doctors {
  width: 300px;
  height: 40%;
  border: 1px solid rgb(100,175,160);
  border-radius: 4px;
  margin-left: 30px;
  /* position: absolute;
  top: 20px;
  left: 400px; */
}
.back-section {
  widows: 950px;
  height: 41px;
  margin-left: 60px;
}

.back-section-btn {
  background: transparent;
  border: none;
}

.back-span {
  margin-right: 5px;
}
</style>

