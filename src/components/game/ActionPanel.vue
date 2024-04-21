<script setup lang="ts">
import { ActionType } from '../../scripts/enums';
import { PLAYER_HEAL_COST_PER_AMOUNT, PLAYER_SUMMON_COST, DEFAULT_PLAYER_HEALTH } from '../../scripts/consts';

const props = defineProps({
  playerLifeForce: Number,
  playerHealth: Number
})

const emit = defineEmits<{
  (event: 'playerAct', action: ActionType): void,
}>()

function act(action : ActionType): void{
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

            <button :disabled="(playerLifeForce?? 0) < PLAYER_SUMMON_COST" 
            @click="act(ActionType.SUMMON)" class="btn btn-dark border border-success border-4">Invocation</button>

            <button :disabled="(playerLifeForce?? 0) < PLAYER_HEAL_COST_PER_AMOUNT || (playerHealth?? 0) >= DEFAULT_PLAYER_HEALTH"
            @click="act(ActionType.HEAL)" class="btn btn-dark border border-success border-4">Soin</button>

            <button @click="act(ActionType.FLEE)" class="btn btn-dark border border-success border-4">Fuir</button>
          </div>
        </div>
    </div>
  </div>
</template>

<style>
</style>