<script setup lang="ts">
import { GAME_FIGHT_AMOUNT } from '../../scripts/consts';

const props = defineProps({
    gameLog: Array<string[]>,
    currentFight: Number,
})

</script>

<template>
  <div class="bg-dark border border-success rounded border-4 text-center mb-4" style="--bs-bg-opacity: .90;">
    <div class="border-bottom border-success border-4 fs-2">
      <span class="text-success outlined-dark">Combat :</span> {{ currentFight }}
      <span class="text-success outlined-dark">/</span> {{ GAME_FIGHT_AMOUNT }}
    </div>
    <div class="log">
      <ul class="list-group" v-for="log in gameLog">
        <li class="list-group-item bg-dark border-success active" :style="{ color: log[1] }" >{{ log[0] }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.log {
   display: flex;
   justify-content: end;
   flex-direction: column;
   height: 70vh;
   overflow: hidden;
}
</style>