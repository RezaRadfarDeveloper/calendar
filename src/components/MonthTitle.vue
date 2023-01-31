<template>
<div class="month-title">
 <Backward @click="getPreviousMonth"></Backward>
   <div class="month">{{selectedMonth}} {{selectedYear}}</div> 
 <Forward @click="getNextMonth"></Forward>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Backward from './Backward.vue';
import Forward from './Forward.vue';
export default {
    components: {
        Backward,
        Forward
    },
    data() {
        return {
            months: ['January','February','March', 'April','May',
             'June', 'July', 'August','September','October', 
             'November', 'December'],
             selectedMonth: '',
             currentYear: '',
             selectedYear: '',
             currentMonthDays:0
        }
    },
    mounted() {
         this.selectedMonth = this.getCurrentMonth();
         this.setCurrentMonth(this.selectedMonth);
         this.setNextMonth(this.getAbsoluteNextMonth());
         //to get the next absolute month as we have the real current month here
         this.selectedYear =this.getCurrentYear();
         this.setDaysInCurrentMonth(this.daysInThisMonth);
         this.setDaysInNextMonth(this.daysInNextMonth);
         this.setSelectedYear(this.selectedYear);
    },

    methods: {
        getCurrentMonth() {
          const today = new Date();
          const currentMonth =  today.toLocaleString('default', { month: 'long' });
          this.setSelectedMonth('Current');
          return currentMonth;   
        },
        getAbsoluteNextMonth() {
          const currentMonth = this.selectedMonth;
          const  currentMonthNum =this.months.indexOf(currentMonth);
          if(currentMonthNum === 11) {
                return 'January';
               } 
               else {
                  return  this.months[currentMonthNum + 1];
               }
        },
        getNextMonth() {

          if(this.getMonthCounter === 1)
             this.setSelectedMonth('NextMonth');
          else
             this.setSelectedMonth('Current');

          this.selectDays();
          this.setMonthCounter(this.getMonthCounter + 1);
          this.setDaysInCurrentMonth(this.daysInThisMonth);
          this.setDaysInNextMonth(this.daysInNextMonth);
               const currentMonth = this.selectedMonth;
               const  currentMonthNum =this.months.indexOf(currentMonth);
               if(currentMonthNum === 11) {
                this.selectedMonth = 'January';
                this.selectedYear = this.selectedYear + 1;
               } 
                 else
               this.selectedMonth = this.months[currentMonthNum + 1];
               this.setSelectedYear(this.selectedYear);
        },  

        getPreviousMonth() {

             const currentMonth = this.selectedMonth;
             
             if(this.getMonthCounter === 2)
               this.setSelectedMonth('Current');
             else
              this.setSelectedMonth('NextMonth');

             this.selectDays();
             this.setMonthCounter(this.getMonthCounter - 1)
             this.setDaysInCurrentMonth(this.daysInThisMonth);
             this.setDaysInNextMonth(this.daysInNextMonth);
               const  currentMonthNum =this.months.indexOf(currentMonth);
               if(currentMonthNum === 0) {
                 this.selectedMonth = 'December';
                 this.selectedYear = this.selectedYear - 1;
               }
               else
                 this.selectedMonth = this.months[currentMonthNum - 1];
                 this.setSelectedYear(this.selectedYear);
        },

        getCurrentYear() {
            const today = new Date();
            return today.getFullYear();
           
        },
        selectDays() {
            this.doctorsList = this.getDoctorsList;
            // console.log(this.doctorsList);
            var days = [];
            var selectedMonth = this.getSelectedMonth;
            this.doctorsList.filter(function(doctor) {
                   days = days.concat(doctor.days[selectedMonth]);
            });
           var count = 0;
           var beforeCount = days.length;
           for(var i = 0; i < days.length - 2; i++) {
                    for(var j = i + 1; j < days.length ; j++) {
                        if(days[i] === days[j] && days[j] != 0) {
                            days[j] = 0;
                            count = count + 1;
                        }
                    }
           } 
           this.setSelectedDays(days.sort().slice(count, beforeCount));
           return days.sort().slice(count, beforeCount);
        },

        ...mapActions(['setCurrentMonth', 'setNextMonth', 'setSelectedMonth', 'setDaysInCurrentMonth', 
        'setDaysInNextMonth', 'setMonthCounter', 'setSelectedDays', 'setSelectedYear'])
    },
    computed: {
        ...mapGetters(['getMonthCounter', 'getSelectedMonth', 'getDoctorsList', 'getSelectedYear']),

        daysInThisMonth() {
          var now = new Date();
          return new Date(now.getFullYear(), now.getMonth()+ this.getMonthCounter, 0).getDate();
        },
        daysInNextMonth() {
          var now = new Date();
          return new Date(now.getFullYear(), now.getMonth()+ this.getMonthCounter + 1, 0).getDate();
        },
    }
}
</script>

<style>
.month-title {
    width: 300px;
    height: 60px;
    background-color:white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
    border: 1px solid rgb(100,175,160);
    border-radius:10px 10px 0px 0px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
}

.month {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #1e3f50;
    font-family: "Source Sans Pro",sans-serif;
}
</style>