<script setup lang="ts">
import { computed, type Ref, ref, watch, type ComputedRef } from 'vue';
import type Character from '../../scripts/interfaces';
import CharacterName from './CharacterName.vue';
import CharacterStats from './CharacterStats.vue';
import CharacterHealthBar from './CharacterHealthBar.vue';
import { PLAYER_COLOR } from '../../scripts/consts';

const props = defineProps({
    player: Object as () => Character,
    playerCurrentHealth: Number,
    playerMinionCount: Number,
})

const playerHealthPercentage: Ref<number> = computed(() => ((props.playerCurrentHealth??0) / props.player!.vitality) * 100)

</script>
<template>
    <div class="bg-dark border border-success rounded border-4" style="--bs-bg-opacity: .90;">
        <div class="container">
          <CharacterName :characterName="player?.name" :characterTitle="player?.title" :color="PLAYER_COLOR" />
            <div class="row align-items-end pt-4 pb-2">
              <CharacterStats :lifeForce="player?.lifeForce" :experience="player?.experience" 
              :minionCount="playerMinionCount" :strength="player?.strength" :color="PLAYER_COLOR" />
              <CharacterHealthBar :characterHealthPercentage="playerHealthPercentage" :characterCurrentHealth="playerCurrentHealth" :color="PLAYER_COLOR" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>