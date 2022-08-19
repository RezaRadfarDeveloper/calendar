<template>
   <!-- <div class="spinner-border text-success" role="status">
    <span class="sr-only"></span>
   </div> -->
   <div class="loading">
      <button class="btn btn-success" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
   </div>

</template>

<script>

</script>

<style>
.loading {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>