<template>
    <div class="doctor">
       <div><img src="https://picsum.photos/200/300?random=1"></div>
       <div class="doctor-label">
           <h5>Haji Jabbar</h5>
           <p>General Practitioner</p>
       </div>
    </div>
</template>
<script>
</script>

<style>
.doctor {
    height: 86px;
    padding: 15px 20px;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    position:relative;
    font-family:  "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 400px;
    font-style: normal;
    flex-wrap: wrap;
    cursor: pointer;
}
img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
}

.doctor-label {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
}
.doctor-label h5 {
    font-size: 15px;
    color: #000;
    line-height: 20px;
    margin: 0;
    font-weight: 400;
}

</style>