<template>
    <div class="main-form">
        <div class="contact-details">
            <h4 class="contact-title">
                Log in
            </h4>
            <div class="d-flex justify-content-between">
                <div class="name-row-first">
                    <label class="label-general" for="">Email</label>
                    <input type="text" v-model="email">
                </div>
                <div class="name-row-first">
                    <label class="label-general" for="">Password</label>
                    <input type="password"  v-model="password">
                </div>
            </div>
        </div>
        <Button :buttonText="'Login'" @click="signIn"></Button>
    </div>
</template>
    
<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

    export default {
        props: ['buttonClicked'],
        components: {
            Button
        },
        data() {
            return {
                password: '',
                email:''
            }
        },
        methods: {
            async signIn() {
          const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5wf4Jymzdk1NWwRxAmdJc4l5_-_bP_GE', 
            {
              method:'POST',
              body: JSON.stringify({
                email: this.email,
                password:this.password,
                returnSecureToken: true
              })
            });
                const responsePack = await response.json();
            
                if(!response.ok) {
                alert('There is an error occurred in Login');
                }
            else {
              this.setSignedUp(true);
              this.setLoggedIn(true);
              this.setToken(responsePack.idToken);
              this.getReservation(responsePack.localId);
              localStorage.setItem('loggedIn',JSON.stringify(true));
              this.selectedDayHourDoctor();
            }
          },
          async getReservation(userId) {
            
            const response = await fetch(`https://calendar-9af77-default-rtdb.firebaseio.com/reservations/${userId}.json?auth=` + this.getToken);
            const responsePack = await response.json();
            
            console.log(responsePack);
            if(!response.ok)
            alert('error in fetching data'); 
            else { 
            const patientDetails = 
            {
            name: responsePack.name,
            family: responsePack.family,
            email: responsePack.email
            }
            
              this.setSelectedDay(responsePack.day);
              this.setSelectedHour(responsePack.hour);
              this.selectedDoctorName(responsePack.doctorName);
              this.selectedDayHourDoctor();
              this.setPatientDetail(patientDetails);
              this.setUserId(responsePack.id);
              this.setSelectedMonth(responsePack.month);
            }

          }, 
            ...mapActions(['validateForm', 'setFormFields','setFormErrors', 'setSignedUp', 'setPatientDetail', 'setToken', 'selectedDayHourDoctor','setSelectedDay', 'setSelectedHour','selectedDoctorName', 'setLoggedIn', 'setUserId', 'setSelectedMonth'])

        },
        computed: {
            ...mapGetters(['formIsValidated','formErrors', 'formFields','getValidationClicked', 'formErrors', 'getUserId', 'getToken'])
        },
    
        watch: {
            //we use store state to save data for patient as we need it for next step to deal with.
            buttonClicked(newValue, oldValue) {
                if(oldValue !== newValue && newValue == true) {
                console.log('clicked in form')
                }
            }
        }
    }
    </script>
    <style scoped>
    
    .main-form {
        width: 950px;
       height: 630px;
       margin-top: 100px;
       margin-left: 200px;
    }
    
    .row-name .name-row-first {
            width: 435px;
            height:100%;
    }
    
    .name-row-first > input {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 42px;
        padding: 0 10px;
        font-size: 14px;
        color: #686868;
        outline: none;
        box-sizing: border-box;
    }
    
    .label-general {
        display: block;
        font-size: 14px;
        color: #1e3f50;
        line-height: 22px;
        font-weight: 500;
        margin-bottom: 5px;
        font-family: "Open Sans",sans-serif;
    }
    
    
    .contact-details {
        width: 950px;
        height: 180px;
        margin-bottom: 30px;
        padding: 25px;
        background-color: #fff;
        box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
        position: relative;
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: flex-start;
        grid-gap: 30px;
        gap: 30px;
    }
    
    .contact-details div > input {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 42px;
        padding: 0 10px;
        font-size: 14px;
        color: #686868;
        outline: none;
        box-sizing: border-box;
    }
    
    .name-row-first {
            width: 435px;
            height:69px;
    }
    
    .contact-title {
     
        width: 900px;
        height: 29px;
        color: #1e3e50;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0;
        margin-bottom: -15px;
        font-family: "Source Sans Pro",sans-serif;
        text-transform: uppercase;
    }
    
    .row-title {
        width: 900px;
        height: 84px;
    }
    .row-title select {
        width: 100%;
        max-width: 200px;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 42px;
        padding: 0 10px;
        font-size: 14px;
        color: #686868;
        outline: none;
        box-sizing: border-box;
    }
    
    .row-name {
        width: 900px;
        height: 108px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        grid-gap: 30px;
        gap: 30px;
    }
    </style>