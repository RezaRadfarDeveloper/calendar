<template>
<div class="nav-items">
    <router-link class="nav-link"  to="/">Home</router-link>
    <router-link class="nav-link"  to="/find">Find</router-link>
    <router-link class="nav-link"  to="/hour">Hour</router-link>
</div>
</template>

<script></script>
<style>
 .nav-items {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid rgba(102,102,102,0.21);
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
 }   

.nav-link {
    width: 150px;
    height: 80px;
    text-decoration: none;
    padding-top: 25px;
    text-align: center;
}
    
</style>