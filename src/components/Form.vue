<template>
<div class="main-form">
    <div class="personal-detail-form">
        <h4 class="title">
            personal details
        </h4>
        <div class="row-title d-flex flex-column">
            <label for="" class="label-general">Title (Optional)</label>
            <select v-model="title">
                <option></option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Miss">Miss</option>
                <option value="Mrs.">Mrs.</option>
            </select>
        </div>
        <div class="row-name">
            <div class="name-row-first">
                <label for="" class="label-general">First Name*</label>
                <input @keyup="updateValidation" type="text" :class="{'is-invalid': formErrors.name &&  getValidationClicked}" v-model="patientName">
                <div v-if="formErrors.name !== '' && getValidationClicked" :class="{'is-invalid-text': formErrors.name &&  getValidationClicked}"> {{errors.name}}</div>
            </div>
            <div class="name-row-first">
                <label for="" class="label-general">Last Name*</label>
                <input @keyup="updateValidation" type="text" :class="{'is-invalid': formErrors.family &&  getValidationClicked}" v-model="patientFamily">
                <div v-if="formErrors.family !== '' && getValidationClicked " :class="{'is-invalid-text': formErrors.family &&  getValidationClicked}"> {{formErrors.family}}</div>
            </div>
        </div>
        
        <div class="row-birth">
            <div class="birth-date">
                <label for="" class="birth-label">Date of Birth*</label>
                <input type="date" name="birth_date" id="birth-date">
                <!-- <div v-if="formErrors.dateOfBirth !== '' && getValidationClicked " :class="{'is-invalid-text': formErrors.dateOfBirth &&  getValidationClicked}"> {{formErrors.dateOfBirth}}</div> -->
            </div>
            
        </div>
    </div>
    <div class="contact-details">
        <h4 class="contact-title">
            Contact details
        </h4>
        <div class="d-flex justify-content-between">
            <div class="name-row-first">
                <label class="label-general" for="">Email</label>
                <input type="text" v-model="email">
            </div>
            <div class="name-row-first">
                <label class="label-general" for="">Password</label>
                <input type="password" @keyup="updateValidation" v-model="password" :class="{'is-invalid': formErrors.password &&  getValidationClicked}">
                <div v-if="formErrors.password !== '' && getValidationClicked" :class="{'is-invalid-text': formErrors.password &&  getValidationClicked}"> {{formErrors.password}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['buttonClicked'],
    data() {
        return {
            patientName: '',
            patientFamily: '',
            dateOfBirth: '',
            password: '',
            email:'',
            title: '',
            errors: {
                name: 'name is required',
                family: 'family is required',
                password: 'password is required'
                // dateOfBirth: 'date of birth is required'
            }
        }
    },
    methods: {
        updateButtonStatus() {
            this.$emit('resetButton', this.title);
        },
        updateValidation() {
               this.validateForm(!this.hasError);
               this.setFormFields({
                name: this.patientName,
                family: this.patientFamily,
                dateOfBirth:this.dateOfBirth ,
                password: this.password,
                title: this.title,
                email: this.email
               });

               this.setFormErrors({
                name:this.patientName.trim() === '' ?'name is required': '',
                family: this.patientFamily.trim()=== '' ?'family is required': '',
                password: this.password.length < 8  ?'password is required and should be at least 8 character': ''
                // dateOfBirth: this.dateOfBirth.trim()=== '' ?'date of birth is required': '',
               })
        },
        ...mapActions(['validateForm', 'setFormFields','setFormErrors'])

    },
    computed: {
        hasError() {
            return this.patientFamily.trim() === '' ||
            this.patientName.trim() === '' ||
            (this.password.length < 8) 
            // || this.dateOfBirth === ''
        },
        ...mapGetters(['formIsValidated','formErrors', 'formFields','getValidationClicked', 'formErrors'])
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
<style>

.personal-detail-form {
    width: 950px;
    height: 370px;
    margin-bottom: 30px;
    padding: 25px;
     background-color: #fff;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    position: relative;
}
.main-form {
    width: 950px;
   height: 630px;
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

.title {
    width: 900px;
    height: 29px;
    color: #1e3e50;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0;
    margin-bottom: 15px;
    font-family: "Source Sans Pro",sans-serif;
    text-transform: uppercase;
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
.row-birth {
    width: 900px;
    height: 84px;
}

.birth-label {
    display: block;
    font-size: 14px;
    color: #1e3f50;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 5px;
    font-family: "Open Sans",sans-serif;
}

.birth-date {
    width: 900px;
    height: 69px;
}

.row-birth .birth-date > input {
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    outline: none;
    line-height: 1.428571429;
    color: #000;
    background-color: #fcfcfc;
    background-image: none;
    border: 1px solid #e6e6e6;
    transition: all ease-in-out .15s;
    box-shadow: none;
    border-radius: 4px;
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

.is-invalid {
    border: red solid 1px !important;
}

.is-invalid-text {
    color: red;
}
</style>