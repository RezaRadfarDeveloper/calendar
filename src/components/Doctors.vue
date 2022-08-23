<template>
    <div>
        <div v-if="loading">
          <Loading></Loading>
        </div>
        <div v-else>
        <Doctor  v-for="doctor in doctorsList" @click="selectByDoctor(doctor.id)" :key="doctor.id" :doctor="doctor"></Doctor>
        </div>
    </div>
</template>

<script>
import Doctor from './Doctor.vue';
import Loading from './Loading.vue';
import { doctors } from '../data.js';

export default {
    data() {
        return {
            doctorsList:doctors,
            loading:false
            
        }
    },
    props:['hourSelected', 'daySelected', 'resetHour'],
    
    components: {
        Doctor,
        Loading
    },

    methods: {

        activeLoader() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        selectByDoctor(id) {
            const doctor = doctors.find(doc => doc.id === id)
            this.$store.dispatch('setDoctor', doctor);
            console.log(doctor);

        },
        //  hours cannot be selected without day selected
        selectDoctors() {

            this.activeLoader();
            if(this.hourSelected > 0 && this.daySelected >0) {
                
                let hour = this.hourSelected;
                let day = this.daySelected;

                 var list =  doctors.filter(function(doctor) {
                     return  doctor.days.August.indexOf(day) !== -1 &&
                      doctor.hours.indexOf(hour) !== -1;
                   
                });
                
            }
                else if(this.hourSelected < 1 && this.daySelected > 0) {
               
                 let day = this.daySelected;
                 list =  doctors.filter(function(doctor) {
                     return  doctor.days.August.indexOf(day) !== -1;
                });
                }
            
            return list;
        },
    },
    watch: {
        hourSelected(oldValue, newValue) {
            if(oldValue != newValue) {
               this.doctorsList = this.selectDoctors();
            }
        },
        daySelected(oldValue, newValue) {
            if(oldValue != newValue) {
               this.doctorsList = this.selectDoctors();
            }
        }
    }
}
</script>