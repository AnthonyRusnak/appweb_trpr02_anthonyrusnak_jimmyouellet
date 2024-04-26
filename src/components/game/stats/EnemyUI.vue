<script setup lang="ts">
import {type Character} from '../../../scripts/interfaces'
import CharacterName from '../stats/CharacterName.vue';
import CharacterStats from './CharacterStats.vue';
import CharacterHealthBar from './CharacterHealthBar.vue';
import { ENEMY_COLOR } from '../../../scripts/consts';

const props = defineProps({
    enemy: Object as () => Character,
    enemyCurrentHealth: Number,
})
</script>

<template>
    <div class="bg-dark border border-success rounded border-4 characterUI container-fluid" style="--bs-bg-opacity: .90;">
        <div class="text-end">
            <CharacterName :characterName="enemy?.name" :characterTitle="enemy?.title" :color="ENEMY_COLOR" />
        </div>
        <div class="row align-items-end pt-4 pb-2">
            <CharacterHealthBar :characterMaxHealth="enemy?.vitality" :characterCurrentHealth="enemyCurrentHealth" :color="ENEMY_COLOR" />
            <CharacterStats :lifeForce="enemy?.lifeForce" :experience="enemy?.experience" :strength="enemy?.strength" :color="ENEMY_COLOR" />
        </div>
    </div>
</template>