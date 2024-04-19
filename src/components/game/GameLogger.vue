<script setup lang="ts">
import { getParsedCommandLineOfConfigFile } from 'typescript';
import { onMounted, ref, defineProps, type Ref } from 'vue'

const props = defineProps({
    gameLog: Array<String>,
    currentFight: Number,
})

</script>

<template>
  <div class="bg-dark border border-success rounded border-4" style="--bs-bg-opacity: .75;">
    Combat {{ currentFight }}
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