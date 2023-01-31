<template>
    <div class="hour-sets">
          <span v-for="hour in hourSet" :key="hour.id">{{ hour.id }}) {{ hour.time }}</span>
        </div>
</template>

<script>
import { hourTable } from '../data';
export default {
    data() {
        return {
            hourSet:hourTable
        }
    }
}
</script>

<style scoped>
.hour-sets {
    width: 400px;
    height: 400px;
    border: 1px solid rgb(100,175,160);
    border-radius: 4px;
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
  }

  span {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>