<script setup lang="ts">
import type Character from '../../scripts/interfaces'
import CharacterName from './CharacterName.vue';
import CharacterStats from './CharacterStats.vue';
import CharacterHealthBar from './CharacterHealthBar.vue';
import { ENEMY_COLOR } from '../../scripts/consts';

const props = defineProps({
    enemy: Object as () => Character,
    enemyCurrentHealth: Number,
})

</script>

<template>
    <div class="bg-dark border border-success rounded border-4" style="--bs-bg-opacity: .90;">
        <div class="container">
            <CharacterName :characterName="'Nicolas Cage'" :characterTitle="'Casseur de mort'" :color="ENEMY_COLOR" />
            <div class="row align-items-end pt-4 pb-2">
                <CharacterHealthBar :characterHealthPercentage="100" :characterCurrentHealth="100" :maxHealth="100" :color="ENEMY_COLOR" />
                <CharacterStats :lifeForce="100" :experience="2" :strength="100" :color="ENEMY_COLOR" />
            </div>
        </div>
    </div>
</template>