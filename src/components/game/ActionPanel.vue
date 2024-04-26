<script setup lang="ts">
import { ActionType } from '../../scripts/enums';
import { PLAYER_HEAL_COST_PER_AMOUNT, PLAYER_SUMMON_COST, DEFAULT_PLAYER_HEALTH } from '../../scripts/consts';

const props = defineProps({
  playerLifeForce: Number,
  playerHealth: Number,
  isPlaying: Boolean
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
          <div class="d-flex justify-content-around">
            <button :disabled="isPlaying" @click="act(ActionType.ATTACK)" class="btn btn-dark border border-success border-4 fs-1">
              <img class="icon" src="../../assets/images/necro_sword.png" alt="Attaque" />
            </button>

            <button :disabled="isPlaying" @click="act(ActionType.DEFEND)" class="btn btn-dark border border-success border-4 fs-1">
              <img class="icon" src="../../assets/images/necro_shield.png" alt="Défense" />
            </button>

            <button :disabled="(playerLifeForce?? 0) < PLAYER_SUMMON_COST || isPlaying" 
            @click="act(ActionType.SUMMON)" class="btn btn-dark border border-success border-4 fs-1">
              <img class="icon" src="../../assets/images/necro_hand.png" alt="Invocation" />
            </button>

            <button :disabled="(playerLifeForce?? 0) < PLAYER_HEAL_COST_PER_AMOUNT || (playerHealth?? 0) >= DEFAULT_PLAYER_HEALTH || isPlaying"
            @click="act(ActionType.HEAL)" class="btn btn-dark border border-success border-4 fs-1">
              <img class="icon" src="../../assets/images/necro_heal.png" alt="Soin" />
            </button>

            <button :disabled="isPlaying" @click="act(ActionType.FLEE)" class="btn btn-dark border border-success border-4 fs-1">
              <img class="icon" src="../../assets/images/necro_flee.png" alt="Fuir" />
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  width: 5rem;
  height: 5rem;
}
</style>