<template>
<div class="month-title">
 <Backward @click="getPreviousMonth"></Backward>
   <div class="month">{{selectedMonth}} {{selectedYear}}</div> 
 <Forward @click="getNextMonth"></Forward>
</div>
</template>

<script>
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
             currentMonth: '',
             selectedMonth: '',
             currentYear: '',
             selectedYear: ''
        }
    },
    mounted() {
         this.selectedMonth = this.getCurrentMonth() ;
         this.selectedYear =this.getCurrentYear()
    },

    methods: {
        getCurrentMonth() {
          const today = new Date();
          const currentMonth =  today.toLocaleString('default', { month: 'long' });
          return currentMonth;
           
        },

        getNextMonth() {
               const currentMonth = this.selectedMonth;
               const  currentMonthNum =this.months.indexOf(currentMonth);
               if(currentMonthNum === 11) {
                this.selectedMonth = 'January';
                this.selectedYear = this.selectedYear + 1;
               }
                 
                 else
               this.selectedMonth = this.months[currentMonthNum + 1];
        },

        getPreviousMonth() {
             const currentMonth = this.selectedMonth;
               const  currentMonthNum =this.months.indexOf(currentMonth);
               if(currentMonthNum === 0) {
                 this.selectedMonth = 'December';
                 this.selectedYear = this.selectedYear - 1;
               }
               else
                 this.selectedMonth = this.months[currentMonthNum - 1];
        },

        getCurrentYear() {
            const today = new Date();
            return today.getFullYear();
           
        }
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