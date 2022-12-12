<template>
        <div class="nav-items">
            <router-link class="nav-link"  to="/">Home</router-link>
            <router-link class="nav-link"  to="/find">Profile</router-link>
            <div class="btn btn-danger" @click="logout">Log out</div>
        </div>
</template>

<script>
export default {

    data() {
        return {

        }
    },
    methods: {
        logout() {
            // alert('logged out');
        }
    }
}

</script>
<style>
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
    
</style>