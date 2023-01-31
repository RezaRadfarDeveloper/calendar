<template>
    <div class="profile">
        <div class="content">
            <h1 class="heading-primary">Your session and Info</h1>
            <div class="session-info">
                <div class="row"> <h3>day:{{ getSelectedDay }}</h3> 
                    <h3>hour: {{ getSelectedHour }}</h3> 
                    <h3>Month: {{ month }}</h3>  
                    <h3>Year: {{ getSelectedYear }}</h3>
                    <h3>Doctor: {{ getSelectedDoctorName }}</h3>
                </div>
                
                <div class="row"><h3>Thank you {{ patientDetails.name }} for being with us</h3></div>   
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            patientDetails: null,
            day: 0,
            hour: 0,
            month: '',
            doctorName: ''
        }
    },
    computed: {
        ...mapGetters(['getSelectedHour',
        'getSelectedDay',
        'getSelectedDoctorName',
        'getPatientDetail',
        'getSelectedMonth',
        'getCurrentMonth',
        'getNextMonth', 
        'getSelectedYear',
        'getSelectedDoctorName'
    ])
    },
    methods: {
        ...mapActions(['patientDetails', 'setSignedUp','setSelectedHour', 'setSelectedMonth', 'setSelectedDay', 'setSelectedYear'])
    },
    beforeMount() {
        this.patientDetails = JSON.parse(localStorage.getItem('details'));
        this.setSelectedDay(JSON.parse((localStorage.getItem('day'))));
         this.setSelectedHour(JSON.parse((localStorage.getItem('hour'))));
         
         this.setSelectedYear((localStorage.getItem('year')));
         this.month = localStorage.getItem('month');
         this.setSignedUp(true);
        console.log(this.patientDetails);
    },
    created() {
        this.day= this.getSelectedDay;
        this.hour = this.getSelectedHour;
    }
}

</script>

<style scoped>

.profile {
    width: 80%;
    margin: 60px auto;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 80%;
    height: 90%;
    margin: 10px 15px;
    background-color: rgba(255, 255, 255, 0.961);
    box-shadow: 0 1.5rem 4rem rgba(0,0,0 , .3);
}

.heading-primary {
    text-align: center;
    margin-top: 20px;
    color: #64afa0;
}

h3 {
    margin: 10px auto;
    text-align: center;
    color: #64afa0;
}

.row {
    widows: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;

}


</style>