<script setup lang="ts">
import { getParsedCommandLineOfConfigFile } from 'typescript';
import { onMounted, ref, defineProps, type Ref } from 'vue'

const props = defineProps({
    gameLog: Array<String>,
    currentFight: Number,
})

</script>

<template>
  <div class="bg-dark border border-success rounded border-4 text-center mb-4" style="--bs-bg-opacity: .90;">
    <div class="h2">
      <span class="text-success outlined-dark">Combat : </span> {{ currentFight }}
      <span class="text-success outlined-dark">/</span> 5
    </div>
    <div class="log" >
      <ul v-for="log in gameLog">
        <li>{{ log }}</li>
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