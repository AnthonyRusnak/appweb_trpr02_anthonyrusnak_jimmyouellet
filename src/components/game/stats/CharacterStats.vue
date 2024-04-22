<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GAME_EXPERIENCE_TEXT } from '../../../scripts/consts';

const props = defineProps({
    lifeForce: Number,
    experience: Number,
    strength: Number,
    minionCount: Number,
    color: String
})

</script>

<template>
    <div class="col m-3">
        <div class="exp outlined-dark text-success">{{ GAME_EXPERIENCE_TEXT[((experience??1) - 1)] }}</div>
        <div class="label outlined-dark text-success" >Force: <span>{{ strength }}</span></div>
        <div class="label outlined-dark text-success">Force vitale: <span>{{ lifeForce }}</span></div>
        <div id="minions" v-bind:class="{hidden: minionCount === undefined}" class="label outlined-dark text-success">Serviteurs: <span>{{ minionCount }}</span></div>
    </div>
</template>

<style scoped>
span {
    font-size: 1.2rem;
    color: v-bind(color);
}
.exp {
    font-size: 2rem;
}
.label {
    font-size: 1.4rem;
}
.hidden {
    visibility: hidden;
}

</style>