<template>
        <div class="nav-items">
            <router-link class="nav-link"  to="/">Home</router-link>
            <router-link v-if="getSignedUp" class="nav-link"  to="/profile">Profile</router-link>
            <div v-if="getSignedUp" class="btn btn-danger" @click="logout">Log out</div>
            <router-link  to="/login" v-else class="btn btn-primary">Log in</router-link>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {

    data() {
        return {

        }
    },
    methods: {
        logout() {
            this.setModal(true);
            setTimeout(() => {
                this.setToken(null);
            this.setUserId(0);
            this.setSelectedDay(0);
            this.setSelectedHour(0);
            this.setDoctor(null);
            this.setFormFields({});
            this.setSignedUp(false);
            this.setPatientDetail({});
            localStorage.setItem('day', 0);
            localStorage.setItem('hour', 0);
            localStorage.setItem('name', '');
            localStorage.setItem('details',JSON.stringify({}));
            localStorage.setItem('loggedIn',JSON.stringify(false));
            this.setModal(false);
            this.$router.push({name:"home"})
            },2000);


            

            // 1_ If route is not home redirect e.g. this.$router.push({name:"profile"})
            // 2_ Open modal loader and then logout the user and clean data in store and storage
            
        },
        ...mapActions(['setModal',
         'setSignedUp', 
         'setToken',
         'setSelectedDay',
         'setSelectedHour',
         'setFormFields',
         'setUserId',
        'setDoctor',
        'setPatientDetail'])
        
    },
    computed: {
        ...mapGetters(['getSignedUp'])
    }
}

</script>
<style scoped>
 .nav-items {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid rgba(102,102,102,0.21);
    position: sticky;
    top: 0;
    margin-right: 20px;
    z-index: 10;
    background-color: white;
 }   

.nav-link {
    width: 150px;
    height: 80px;
    padding-top: 25px !important;
    text-decoration: none;
    text-align: center;
}

.btn:focus {
outline: none !important;
box-shadow: none !important;
}
    
</style>