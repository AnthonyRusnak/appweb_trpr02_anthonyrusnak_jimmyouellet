<script setup lang="ts">
import { ActionType } from '../../scripts/enums';

const emit = defineEmits<{
  (event: 'playerAct', action: ActionType): void,
}>()

function act(action : ActionType){
  emit('playerAct', action)
}

</script>

<template>
  <div class="container">
    <div class="row align-items-start gx-4">
        <div class="bg-dark border border-success rounded border-4" style="--bs-bg-opacity: .75;">
          <div class="text-center fs-5">Actions</div>
          <div class="d-flex justify-content-around">
            <button @click="act(ActionType.ATTACK)" class="btn btn-dark border border-success border-4">Attaquer</button>
            <button @click="act(ActionType.DEFEND)" class="btn btn-dark border border-success border-4">Bloquer</button>
            <button @click="act(ActionType.SUMMON)" class="btn btn-dark border border-success border-4">Invocation</button>
            <button @click="act(ActionType.HEAL)" class="btn btn-dark border border-success border-4">Se soigner</button>
            <button @click="act(ActionType.FLEE)" class="btn btn-dark border border-success border-4">Fuir</button>
          </div>
        </div>
    </div>
  </div>
</template>

<style>
</style>