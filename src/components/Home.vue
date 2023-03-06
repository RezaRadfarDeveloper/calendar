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
        <HoursTable></HoursTable>
    </div>
    <div class="mb-5">
        <Button :class=" showContinue && step === 'continue' ? 'd-block' : 'd-none'" :buttonText="step" @click="setStep('continue','appointment')"></Button>
    </div>
  </div>
    <div v-if="step === 'appointment'"  class="d-flex flex-column justify-content-start container ml-5 mt-5 mb-5">
      <SignedUp v-if="getSignedUp"></SignedUp>
      <Form v-else :buttonClicked="registeredClicked"  @deActiveBtn="deActiveBtn" @resetButton="resetSubmit"></Form>
    <Button  :class=" step === 'appointment' ? 'd-block' : 'd-none'" :buttonText="step" @click="formIsValidated || getSignedUp ? setStep('appointment','finalize') : setErrors()"></Button>
  </div>
  <div v-if="step === 'finalize'" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
    yes
    <Button  :class=" step === 'finalize' ? 'd-block' : 'd-none'" :buttonText="step" @click="setStep('finalize','info')"></Button>
  </div>
  <div v-if="step==='info'" class="d-flex justify-content-start container ml-5 mt-5 mb-5">
      <Info></Info>
  </div>
  <Back v-if="oldStep !== ''" @click="setStep(twoStepBefore,oldStep);resetValidation();"></Back>

</div>
</template>

<script>
  import MonthTitle from './MonthTitle.vue';
  import Days from './Days.vue';
  import Hours from './Hours.vue';
  import Doctors from './Doctors.vue';
  import Steps from './Steps.vue';
  import Button from './Button.vue';
  import Form from './Form.vue';
  import HoursTable from './HoursTable.vue';
  import Info from './Info.vue';
  import Back from './Back.vue';
  import SignedUp from './SignedUp.vue';
  import { hourTable } from '../data';
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
        hourSet: hourTable,
        registeredClicked:false,
        details: null,
        twoStepBefore: '',
        hideBtn:true
      
      }
    },
    components: {
      MonthTitle,
      Days,
      Hours,
      Doctors,
      Steps,
      Button,
      Form,
      Back,
      SignedUp,
      HoursTable,
      Info
   },
  
  computed: {
      showContinue()  {
        return this.daySelected && this.hourSelected && this.doctorSelected ;
      },
  
      ...mapGetters(['doctorSelected', 'formIsValidated', 'formFields',
       'getSignedUp', 'getUserId', 'getToken', 'getPatientDetail', 'getSelectedDay',
       'getSelectedHour','getSelectedYear','getSelectedMonth', 'getLoggedIn'
      ]),
  
      step() {
        return this.stepValue;
      },
      previousStep() {
        return  this.oldStep;
      },
      btnHidden() {
        return this.hideBtn;
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
      deActiveBtn(state) {
        this.hideBtn = state;
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
          resetHour: 'resetHour',
          setValidationClicked: 'setValidationClicked',
          setFormFields: 'setFormFields',
          validateForm: 'validateForm',
          setFormErrors: 'setFormErrors',
          setSignedUp: 'setSignedUp',
          setSelectedDay:'setSelectedDay',
          setSelectedHour: 'setSelectedHour',
          setUserId: 'setUserId',
          setToken: 'setToken',
          setPatientDetail: 'setPatientDetail',
          selectedDayHourDoctor: 'selectedDayHourDoctor'
          // fetchReservation: 'fetchReservation'
          }),
    async signIn() {
     
          const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5wf4Jymzdk1NWwRxAmdJc4l5_-_bP_GE', 
            {
              method:'POST',
              body: JSON.stringify({
                email: this.formFields.email,
                password:this.formFields.password,
                returnSecureToken: true
              })
            });
                const responsePack = await response.json();
            if(!response.ok) {
              alert('There is an error occurred in Login');
            }
            else {
              //TBC
              console.log('the login ID is:' + responsePack.localId + '--' + responsePack.email +  '--' + responsePack.expiresIn);
              // this.setPatientDetail();
              this.setSignedUp(true);
            }
          },

        async signUp() {
          const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5wf4Jymzdk1NWwRxAmdJc4l5_-_bP_GE', 
            {
              method:'POST',
              body: JSON.stringify({
                email: this.formFields.email,
                password: this.formFields.password,
                returnSecureToken: true
              })
            });
            // console.log(response);
                const responsePack = await response.json();
            if(!response.ok) {
              alert('There is an error occurred in signing up');
            }
            else {
              const patientDetails = {
                name: this.formFields.name,
                family: this.formFields.family,
                email: this.formFields.email
              }

              this.setPatientDetail(patientDetails);
              this.setSignedUp(true);
              localStorage.setItem('loggedIn', true);
              this.setUser(responsePack.localId);
              this.setToken(responsePack.idToken);
            }
          },
          //TBC the method to get user data based on the id
          async getReservation() {
            const userId = this.getUserId;
            const response = await fetch(`https://calendar-9af77-default-rtdb.firebaseio.com/reservations/${userId}.json?auth=` + this.getToken);

            if(!response.ok)
            alert('error in fetching data'); 
            console.log(response.json());
          },
        setStep(oldValue,newValue) {
          console.log(oldValue + 'clicked');
          if(this.step === 'appointment' && !this.getSignedUp) {
            this.setValidationClicked(true);
            if(newValue === 'finalize') {
              this.signUp();
            }
          }

          if(this.step === 'appointment' && this.getLoggedIn)
          this.setUser(this.getUserId);

          if(this.step === 'appointment' && this.getSignedUp) {
           
              this.validateForm(true);
              this.stepValue = newValue;
              this.oldStep = oldValue;
            }
          
          if(this.step === 'continue') {
            this.setValidationClicked(false);
            this.selectedDayHourDoctor();
          }
          if(this.step === 'appointment' && newValue === 'continue' && !this.getSignedUp) {
            this.resetValidation();
          }
  
          this.stepValue = newValue;
          this.oldStep = oldValue;
          oldValue === 'continue' ? this.registeredClicked = false : this.registeredClicked = true; 
            
            if(this.oldStep === 'appointment')
          this.twoStepBefore = 'continue';
          else if( this.oldStep ==='finalize')
          this.twoStepBefore = 'appointment'
          else 
          this.twoStepBefore= ''
        },
        setErrors() {
          this.setValidationClicked(true);
        },
        resetValidation() {
          this.validateForm(false);
          this.setFormFields({});
          this.setValidationClicked(false);
          this.setFormErrors({
             name:'name is required',
                  family: 'family is required',
                  password: 'password is required and should be at least 8 character'
                  // dateOfBirth: 'date of birth is required'
                });
        },
       async  setUser(userId) {
              const user = {
                hour: this.hour,
                day: this.day,
                doctorName: this.doctorSelected.name,
                name:this.formFields.name,
                family: this.formFields.family,
                email:this.formFields.email,
                month: this.getSelectedMonth,
                year: this.getSelectedYear
              }
              const response = await fetch(`https://calendar-9af77-default-rtdb.firebaseio.com/reservations/${userId}.json`, {
                  method: 'PUT',
                  body: JSON.stringify({...user, id:userId})
              });

              const responsePack = await response.json();
              // console.log(response);
              console.log(responsePack);
              if(!response.ok) {
                alert ("registration Failed");
                return;
              }
              this.setUserId(userId);
              console.log('Successfully registered');
        },
        //to-be-completed
        setStore() {
         this.setSelectedDay(JSON.parse((localStorage.getItem('day'))));
         this.setSelectedHour(JSON.parse((localStorage.getItem('hour'))));
         console.log(JSON.parse(localStorage.getItem('loggedIn')));
         this.setSignedUp(JSON.parse(localStorage.getItem('loggedIn')));
          console.log(JSON.parse(localStorage.getItem('hour')));
          console.log((localStorage.getItem('name')));
        }
    },

    beforeMount(){
    this.setStore();
    // this.getReservation();
    }, 
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
    max-height: 345px;
    overflow: auto;    
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