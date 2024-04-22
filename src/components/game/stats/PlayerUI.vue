<script setup lang="ts">
import { defineProps } from 'vue';
import type Character from '../../../scripts/interfaces';
import CharacterName from '../stats/CharacterName.vue';
import CharacterStats from './CharacterStats.vue';
import CharacterHealthBar from './CharacterHealthBar.vue';
import { PLAYER_COLOR } from '../../../scripts/consts';

const props = defineProps({
    player: Object as () => Character,
    playerCurrentHealth: Number,
    playerMinionCount: Number,
})

</script>
<template>
    <div class="bg-dark border border-success rounded border-4 characterUI container-fluid" style="--bs-bg-opacity: .90;">
      <CharacterName :characterName="player?.name" :characterTitle="player?.title" :color="PLAYER_COLOR" />
        <div class="row align-items-end pt-4 pb-2">
          <CharacterStats :lifeForce="player?.lifeForce" :experience="player?.experience" 
          :minionCount="playerMinionCount" :strength="player?.strength" :color="PLAYER_COLOR" />
          <CharacterHealthBar :characterMaxHealth="player?.vitality" :characterCurrentHealth="playerCurrentHealth" :color="PLAYER_COLOR" />
        </div>
    </div>
</template>

<style scoped>
</style>