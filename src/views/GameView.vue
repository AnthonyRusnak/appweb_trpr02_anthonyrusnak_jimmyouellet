<script setup lang="ts">

const props = defineProps({
  playerName: String,
  playerTitleId: Number,
})

</script>

<template>
    <div class="container">
        <p class="text-center fs-1">Bienvenue, {{ props.playerName }} {{ props.playerTitleId }} </p>
    </div>
</template>

<style>
</style>